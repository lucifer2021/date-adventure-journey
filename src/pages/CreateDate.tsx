import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight, Copy, Send } from 'lucide-react';
import { generateUniqueToken } from '@/lib/utils';

const CreateDate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [inviteeName, setInviteeName] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');

  // Fetch user profile data when component mounts
  React.useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', user.id)
          .single();
        
        if (!error && data) {
          setUserName(data.name || '');
        }
      }
    };
    
    fetchUserProfile();
  }, [user]);

  const handleCreateDate = async () => {
    if (!inviteeName) {
      toast({
        title: "Missing information",
        description: "Please provide a name for your date invitation.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      const token = generateUniqueToken();
      
      // Create a pending date invitation with token and invitee name
      const { data, error } = await supabase
        .from('dates')
        .insert([{
          inviter_id: user.id,
          inviter_name: userName,
          invitee_name: inviteeName,
          invitee_email: `${inviteeName.toLowerCase().replace(/\s+/g, '.')}@placeholder.com`, // Create a placeholder email
          invite_token: token,
          status: 'pending'
        }])
        .select();

      if (error) {
        console.error("Insert error:", error);
        throw error;
      }

      // Create notification for the inviter
      await supabase
        .from('notifications')
        .insert([{
          user_id: user.id,
          message: `You've created a date invitation for ${inviteeName}`,
          date_id: data[0].id
        }]);

      const baseUrl = window.location.origin;
      const link = `${baseUrl}/invite/${token}`;
      setInviteLink(link);
      
      toast({
        title: "Success!",
        description: "Your date invitation has been created. Share the link with your invitee!",
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

  return (
    <div className="container max-w-3xl py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Create a Date Invitation</h1>
      </div>
      
      <div className="space-y-6">
        {!inviteLink ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Who's the Lucky Person?</h2>
            <p className="text-gray-600 mb-6">
              Enter the name of the person you want to invite on a date.
              They'll receive a link to set up the date details.
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invitee-name">Their Name</Label>
                <Input
                  id="invitee-name"
                  type="text"
                  placeholder="John Doe"
                  value={inviteeName}
                  onChange={(e) => setInviteeName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button 
                onClick={handleCreateDate}
                disabled={!inviteeName || loading}
                className="gap-2"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  <>
                    Create Invitation <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold">Invitation Created!</h2>
            <p className="text-gray-600">
              Share this link with {inviteeName} so they can set up your date details.
            </p>
            
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex-1 truncate text-left text-xs sm:text-sm">
                {inviteLink}
              </div>
              <Button variant="outline" size="sm" onClick={copyInviteLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-gray-600 mt-4">
              Once they accept and set the details, you'll see the complete date information in your dashboard.
            </p>
            
            <div className="flex justify-center pt-4">
              <Button onClick={handleGoToDashboard}>Go to Dashboard</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateDate;
