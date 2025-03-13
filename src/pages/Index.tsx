
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DateInvitation from '@/components/DateInvitation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Heart, Calendar, Plus } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {user ? (
        <div className="container max-w-5xl py-12 px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Welcome to DateInvite</h1>
            <p className="text-xl text-gray-600 mb-8">Create and send beautiful date invitations to your special someone.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/create-date')} size="lg" className="gap-2">
                <Plus size={18} />
                Create New Date
              </Button>
              <Button onClick={() => navigate('/dashboard')} variant="outline" size="lg" className="gap-2">
                <Calendar size={18} />
                View Your Dates
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">How It Works</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-date-primary/10 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-date-primary">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Create a Date Invitation</h3>
                    <p className="text-gray-600">Choose the date, time, food, and movie you'd like to enjoy together.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-date-primary/10 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-date-primary">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Send the Invitation</h3>
                    <p className="text-gray-600">Share a unique invitation link with the person you want to date.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-date-primary/10 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-date-primary">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Get a Response</h3>
                    <p className="text-gray-600">When they accept, both of you will see all the details of your upcoming date!</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Sample Invitation</h3>
                <Heart className="text-date-primary h-5 w-5" />
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-sm">
                <p className="font-medium mb-2">Hey there,</p>
                <p className="mb-2">You've been invited on a date! Click the link to see all the details and respond.</p>
                <div className="mt-4 border-t pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-date-primary" />
                    <span>Friday evening, dinner and a movie</span>
                  </div>
                  <Button size="sm" className="w-full">View Invitation</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Create Beautiful Date Invitations</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Ask someone special on a date with our interactive invitation maker. Choose the food, movie, and time - then share with one click!</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg">
                <Link to="/auth" className="gap-2">
                  <Heart className="h-5 w-5" />
                  Get Started
                </Link>
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-3xl mx-auto">
              <DateInvitation isHomepageDemo={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
