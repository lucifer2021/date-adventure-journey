
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DateInvitation from '@/components/DateInvitation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock } from 'lucide-react'; // Changed from LockClosed to Lock

const Index = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-date-primary">
            Plan Perfect Dates, <br />
            <span className="text-date-accent">Every Time</span>
          </h1>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            Create personalized date invitations with food, movies, and more. 
            Send digital invites to anyone and track their responses in real-time.
          </p>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Get Started <Lock className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Log In
                </Button>
              </Link>
            </div>
            
            <Alert variant="default" className="bg-date-primary/5 border-date-primary/20">
              <AlertDescription>
                Already got an invite? Check your email for a link or ask your date to share it with you!
              </AlertDescription>
            </Alert>
          </div>
        </div>
        
        <div className="rounded-xl shadow-xl overflow-hidden bg-white p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-center">Preview the Experience</h2>
          <div className="scale-[0.85] origin-top">
            <DateInvitation isHomepageDemo={true} />
          </div>
        </div>
      </div>
      
      <div className="mt-24 space-y-16">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-date-primary">Why Choose Our Date Planner?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take the guesswork out of planning the perfect date night
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-white shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-date-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-date-primary font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy to Create</h3>
            <p className="text-gray-600">
              Design your perfect date in minutes with our simple step-by-step wizard
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-white shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-date-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-date-primary font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fun Experience</h3>
            <p className="text-gray-600">
              Interactive elements make receiving a date invitation exciting and memorable
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-white shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-date-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-date-primary font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
            <p className="text-gray-600">
              See when your date views and responds to your invitation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
