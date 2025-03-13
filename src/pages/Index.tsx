
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, Heart, Calendar, MessageSquare, BadgeCheck } from 'lucide-react';

const Index = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-24">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-date-primary">
            Make Every Date <br />
            <span className="text-date-accent">Unforgettable</span>
          </h1>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            Send beautiful, interactive date invitations that get responses. Plan your perfect date with just a few clicks.
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
        
        <div className="rounded-xl shadow-xl overflow-hidden bg-white border border-gray-100">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-date-primary/10 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-date-primary" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-center text-date-primary">Interactive Date Invitations</h2>
            
            <p className="text-center text-gray-600">
              Our beautiful invitations make date planning fun, memorable, and easy to coordinate.
            </p>
            
            <div className="flex justify-center pt-4">
              <img 
                src="https://images.unsplash.com/photo-1522073607757-5a2b8f54745c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Dating app preview" 
                className="rounded-lg shadow-md max-w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="mt-24 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-date-primary">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Plan, invite, and track your perfect date in three simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-white shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-date-primary/10 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-date-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Create an Invitation</h3>
            <p className="text-gray-600">
              Design your perfect date invitation with customized elements in just a few minutes
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-white shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-date-primary/10 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-date-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Share the Link</h3>
            <p className="text-gray-600">
              Send your invitation link via email, text, or any messaging app to your special someone
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-white shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-date-primary/10 rounded-full flex items-center justify-center mb-4">
              <BadgeCheck className="h-6 w-6 text-date-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Responses</h3>
            <p className="text-gray-600">
              Get notified when your date responds and see all your confirmed plans in one place
            </p>
          </div>
        </div>
      </div>
      
      {/* Testimonial */}
      <div className="mt-24 bg-date-primary/5 rounded-xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-medium text-gray-700 italic mb-6">
            "This app made planning our anniversary date so much more special! The interactive elements added a fun touch that my partner loved."
          </p>
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <p className="font-semibold text-date-primary">Sarah T.</p>
              <p className="text-sm text-gray-500">Happy User</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="mt-24 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Create Your Perfect Date?</h2>
        <Link to="/auth">
          <Button size="lg" className="gap-2">
            Get Started Today <Heart className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
