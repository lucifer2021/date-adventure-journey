
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Film, Utensils, Heart, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

const DateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDateDetails = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('dates')
          .select('*, profiles:inviter_id(name)')
          .eq('id', id)
          .single();

        if (error) throw error;
        setDate(data);
      } catch (error) {
        console.error('Error fetching date details:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch the date details.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDateDetails();
    }
  }, [id, toast]);

  const getExcitementEmoji = (level) => {
    if (!level) return '😐';
    if (level <= 3) return '😐';
    if (level <= 7) return '😊';
    return '😍';
  };

  return (
    <div className="container max-w-3xl py-8">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Button>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-date-primary"></div>
        </div>
      ) : date ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Date Details</h1>
            <Badge variant="outline" className={`
              ${date.status === 'accepted' ? 'bg-green-50 text-green-700 border-green-200' : ''}
              ${date.status === 'declined' ? 'bg-red-50 text-red-700 border-red-200' : ''}
              ${date.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
            `}>
              {date.status.charAt(0).toUpperCase() + date.status.slice(1)}
            </Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Date Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-date-primary/10 p-3 rounded-full">
                    <Calendar className="h-5 w-5 text-date-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Date</p>
                    <p className="text-gray-600">
                      {date.date_time 
                        ? format(new Date(date.date_time), "EEEE, MMMM d, yyyy")
                        : 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-date-primary/10 p-3 rounded-full">
                    <Clock className="h-5 w-5 text-date-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Time</p>
                    <p className="text-gray-600">
                      {date.date_time 
                        ? format(new Date(date.date_time), "h:mm a")
                        : 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-date-primary/10 p-3 rounded-full">
                    <Utensils className="h-5 w-5 text-date-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Food</p>
                    <p className="text-gray-600">
                      {date.food?.name || 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-date-primary/10 p-3 rounded-full">
                    <Film className="h-5 w-5 text-date-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Movie</p>
                    <p className="text-gray-600">
                      {date.movie?.title || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-date-primary/10 p-3 rounded-full">
                    <Heart className="h-5 w-5 text-date-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Excitement Level</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-date-primary h-2.5 rounded-full" 
                          style={{ width: `${(date.excitement_level || 0) * 10}%` }}
                        ></div>
                      </div>
                      <span className="text-lg" aria-hidden="true">
                        {getExcitementEmoji(date.excitement_level)}
                      </span>
                      <span className="text-gray-600">
                        {date.excitement_level || 0}/10
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-gray-900">Inviter</p>
                  <p className="text-gray-600">
                    {date.profiles?.name || 'Someone special'}
                  </p>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <p className="font-medium text-gray-900">Invitee</p>
                  <p className="text-gray-600">{date.invitee_name || date.invitee_email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl font-semibold text-gray-700">Date not found</p>
          <p className="text-gray-500 mt-2">The date you're looking for doesn't exist or you don't have permission to view it.</p>
          <Button onClick={() => navigate('/dashboard')} className="mt-6">
            Go to Dashboard
          </Button>
        </div>
      )}
    </div>
  );
};

export default DateDetails;
