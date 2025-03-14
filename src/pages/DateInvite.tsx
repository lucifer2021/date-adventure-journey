
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Check, X, Calendar, Clock, Utensils, Film, Heart } from 'lucide-react';
import { format } from 'date-fns';
import DateInvitation from '@/components/DateInvitation';

const DateInvite = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const { data, error } = await supabase
          .from('dates')
          .select('*')
          .eq('invite_token', token)
          .single();

        if (error) throw error;
        setDate(data);
        setAuthorized(true);
      } catch (error) {
        console.error('Error fetching date invitation:', error);
        toast({
          title: 'Error',
          description: 'This invitation link is invalid or has expired.',
          variant: 'destructive',
        });
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDate();
    }
  }, [token, toast]);

  const handleCompleteDate = async (dateDetails) => {
    try {
      setLoadingResponse(true);
      
      const { error } = await supabase
        .from('dates')
        .update({ 
          status: 'accepted',
          date_time: dateDetails.dateTime,
          food: dateDetails.food,
          movie: dateDetails.movie,
          excitement_level: dateDetails.excitementLevel
        })
        .eq('id', date.id);

      if (error) throw error;

      // Create notification for the inviter
      await supabase
        .from('notifications')
        .insert([{
          user_id: date.inviter_id,
          message: `Your date invitation has been accepted by ${date.invitee_email} and all details have been set!`,
          date_id: date.id
        }]);

      toast({
        title: 'Date Accepted!',
        description: "You've accepted the date invitation and set all the details. It's a date!"
      });

      navigate('/');
    } catch (error) {
      console.error(`Error completing date:`, error);
      toast({
        title: 'Error',
        description: `Failed to complete the date invitation.`,
        variant: 'destructive',
      });
    } finally {
      setLoadingResponse(false);
    }
  };

  const handleDecline = async () => {
    try {
      setLoadingResponse(true);
      
      const { error } = await supabase
        .from('dates')
        .update({ status: 'declined' })
        .eq('id', date.id);

      if (error) throw error;

      // Create notification for the inviter
      await supabase
        .from('notifications')
        .insert([{
          user_id: date.inviter_id,
          message: `Your date invitation has been declined by ${date.invitee_email}`,
          date_id: date.id
        }]);

      toast({
        title: 'Date Declined',
        description: "You've declined the date invitation."
      });

      navigate('/');
    } catch (error) {
      console.error(`Error declining date:`, error);
      toast({
        title: 'Error',
        description: `Failed to decline the date invitation.`,
        variant: 'destructive',
      });
    } finally {
      setLoadingResponse(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-date-primary"></div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Invalid Invitation</h1>
          <p className="text-gray-600 mb-6">This invitation link is invalid or has expired.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  // If the date is already responded to
  if (date.status !== 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          {date.status === 'accepted' ? (
            <>
              <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">This Date Has Been Accepted</h1>
              <p className="text-gray-600 mb-6">
                This invitation has already been accepted. The date is confirmed!
              </p>
            </>
          ) : (
            <>
              <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">This Date Has Been Declined</h1>
              <p className="text-gray-600 mb-6">
                This invitation has already been declined.
              </p>
            </>
          )}
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  // Using the DateInvitation component for invitee view with complete date flow
  return <DateInvitation 
    isInvitationView={true} 
    dateData={date} 
    onComplete={handleCompleteDate} 
    onDecline={handleDecline} 
  />;
};

export default DateInvite;
