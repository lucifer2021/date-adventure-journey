
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, Clock, Film, Utensils, Mail, Heart, Plus } from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dates, setDates] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const { data, error } = await supabase
          .from('dates')
          .select('*')
          .or(`inviter_id.eq.${user.id},invitee_email.eq.${user.email}`)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setDates(data || []);
      } catch (error) {
        console.error('Error fetching dates:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch your dates.',
          variant: 'destructive',
        });
      }
    };

    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setNotifications(data || []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDates();
    fetchNotifications();

    // Set up realtime subscription for dates
    const datesSubscription = supabase
      .channel('dates-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'dates' }, 
        (payload) => {
          fetchDates();
      })
      .subscribe();

    // Set up realtime subscription for notifications
    const notificationsSubscription = supabase
      .channel('notifications-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        (payload) => {
          fetchNotifications();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(datesSubscription);
      supabase.removeChannel(notificationsSubscription);
    };
  }, [user, toast]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Accepted</Badge>;
      case 'declined':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Declined</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleCreateDate = () => {
    navigate('/create-date');
  };

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <Button onClick={handleCreateDate} className="gap-2">
          <Plus size={16} /> Create Date
        </Button>
      </div>

      <Tabs defaultValue="dates">
        <TabsList className="mb-6">
          <TabsTrigger value="dates">Your Dates</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="dates">
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-date-primary"></div>
            </div>
          ) : dates.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-1">No dates yet</h3>
              <p className="text-gray-500 mb-6">Create your first date invitation!</p>
              <Button onClick={handleCreateDate}>Create Date</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {dates.map((date) => (
                <Card key={date.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Date Invitation
                          {getStatusBadge(date.status)}
                        </CardTitle>
                        <CardDescription>
                          {date.inviter_id === user.id 
                            ? `Sent to ${date.invitee_email}`
                            : `From ${date.inviter_email || 'Someone special'}`}
                        </CardDescription>
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(new Date(date.created_at), 'MMM d, yyyy')}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-date-primary/10 p-2 rounded-full">
                          <Calendar className="h-4 w-4 text-date-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">When</p>
                          <p className="text-sm text-gray-500">
                            {date.date_time 
                              ? format(new Date(date.date_time), "EEE, MMM d, yyyy")
                              : 'Not specified'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-date-primary/10 p-2 rounded-full">
                          <Clock className="h-4 w-4 text-date-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Time</p>
                          <p className="text-sm text-gray-500">
                            {date.date_time 
                              ? format(new Date(date.date_time), "h:mm a")
                              : 'Not specified'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-date-primary/10 p-2 rounded-full">
                          <Utensils className="h-4 w-4 text-date-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Food</p>
                          <p className="text-sm text-gray-500">
                            {date.food?.name || 'Not specified'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-date-primary/10 p-2 rounded-full">
                          <Film className="h-4 w-4 text-date-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Movie</p>
                          <p className="text-sm text-gray-500">
                            {date.movie?.title || 'Not specified'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {date.status === 'pending' && date.inviter_id === user.id && (
                      <Button variant="outline" className="w-full" onClick={() => navigate(`/invite/${date.invite_token}`)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Copy Invitation Link
                      </Button>
                    )}
                    {date.status === 'accepted' && (
                      <Button variant="outline" className="w-full" onClick={() => navigate(`/date-details/${date.id}`)}>
                        View Details
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="notifications">
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-date-primary"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-1">No notifications</h3>
              <p className="text-gray-500">You don't have any notifications yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <Card key={notification.id} className={`overflow-hidden ${!notification.read_status ? 'border-date-primary' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${!notification.read_status ? 'bg-date-primary/10' : 'bg-gray-100'}`}>
                        <Mail className={`h-4 w-4 ${!notification.read_status ? 'text-date-primary' : 'text-gray-500'}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${!notification.read_status ? 'font-medium' : ''}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {format(new Date(notification.created_at), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
