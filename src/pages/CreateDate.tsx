
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import StepTwo from '@/components/StepTwo';
import StepThree from '@/components/StepThree';
import StepFour from '@/components/StepFour';
import StepFive from '@/components/StepFive';
import { ArrowLeft, ArrowRight, Copy, Send } from 'lucide-react';
import { generateUniqueToken } from '@/lib/utils';

interface Food {
  id: string;
  name: string;
  image?: string;
  gif?: string;
}

interface Movie {
  id: string;
  title: string;
}

const CreateDate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [inviteeEmail, setInviteeEmail] = useState('');
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [food, setFood] = useState<Food | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [excitementLevel, setExcitementLevel] = useState(5);
  const [inviteLink, setInviteLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleDateTimeSelection = (dateTime: Date) => {
    setDateTime(dateTime);
    handleNextStep();
  };

  const handleFoodSelection = (food: Food) => {
    setFood(food);
    handleNextStep();
  };

  const handleMovieSelection = (movie: Movie) => {
    setMovie(movie);
    handleNextStep();
  };

  const handleExcitementSelection = (level: number) => {
    setExcitementLevel(level);
    handleNextStep();
  };

  const handleCreateDate = async () => {
    try {
      setLoading(true);
      const token = generateUniqueToken();
      
      // Fixed: Use the correct format for Supabase insert
      const { data, error } = await supabase
        .from('dates')
        .insert([{
          inviter_id: user.id,
          invitee_email: inviteeEmail,
          invite_token: token,
          date_time: dateTime,
          food: food,
          movie: movie,
          excitement_level: excitementLevel,
          status: 'pending'
        }])
        .select();

      if (error) throw error;

      // Fixed: Insert into notifications table with proper array format
      await supabase
        .from('notifications')
        .insert([{
          user_id: user.id,
          message: `You've created a date invitation for ${inviteeEmail}`,
          date_id: data[0].id
        }]);

      const baseUrl = window.location.origin;
      const link = `${baseUrl}/invite/${token}`;
      setInviteLink(link);
      
      toast({
        title: "Success!",
        description: "Your date invitation has been created.",
      });
    } catch (error) {
      console.error("Error creating date:", error);
      toast({
        title: "Error",
        description: "Failed to create date invitation.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Link copied",
      description: "Invitation link copied to clipboard."
    });
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Who's the Lucky Person?</h2>
              <p className="text-gray-600 mb-6">Enter the email address of the person you want to invite on a date.</p>
              <div className="space-y-2">
                <Label htmlFor="invitee-email">Email Address</Label>
                <Input
                  id="invitee-email"
                  type="email"
                  placeholder="their@email.com"
                  value={inviteeEmail}
                  onChange={(e) => setInviteeEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={handleNextStep}
                disabled={!inviteeEmail}
                className="gap-2"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <StepTwo onNext={handleDateTimeSelection} />
            <div className="mt-4 flex justify-start">
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <StepThree onNext={handleFoodSelection} />
            <div className="mt-4 flex justify-start">
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <StepFour onNext={handleMovieSelection} />
            <div className="mt-4 flex justify-start">
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <StepFive onNext={handleExcitementSelection} />
            <div className="mt-4 flex justify-start">
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold">Ready to Send Your Invitation!</h2>
            <p className="text-gray-600">
              You're all set to invite {inviteeEmail} on a date.
            </p>
            
            <div className="w-full max-w-md mx-auto glass-card p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Date Summary</h3>
              
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="bg-date-primary/10 p-2 rounded-full">
                    <Send className="h-5 w-5 text-date-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">To</h4>
                    <p className="text-gray-600">{inviteeEmail}</p>
                  </div>
                </div>
                
                {dateTime && (
                  <div className="flex items-start gap-3">
                    <div className="bg-date-primary/10 p-2 rounded-full">
                      <ArrowRight className="h-5 w-5 text-date-primary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium">Details</h4>
                      <p className="text-gray-600">All set! Click Create to generate your invitation link.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {inviteLink ? (
              <>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-1 truncate text-left text-xs sm:text-sm">
                    {inviteLink}
                  </div>
                  <Button variant="outline" size="sm" onClick={copyInviteLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-center pt-4">
                  <Button onClick={handleGoToDashboard}>Go to Dashboard</Button>
                </div>
              </>
            ) : (
              <div className="flex justify-center pt-4">
                <Button onClick={handleCreateDate} disabled={loading}>
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    "Create Invitation"
                  )}
                </Button>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-3xl py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Create a Date Invitation</h1>
      </div>
      
      {renderStep()}
    </div>
  );
};

export default CreateDate;
