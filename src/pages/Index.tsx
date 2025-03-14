
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Lock, Heart, Calendar, Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-24">
      {/* Hero Section */}
      <div className="flex flex-col gap-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-date-primary">
              Make Dating <span className="text-date-accent">Simple & Special</span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Create beautiful date invitations, plan seamlessly, and make every date memorable — all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
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
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-date-primary/5 to-date-accent/5 border border-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Couple on a date" 
              className="w-full h-auto rounded-t-xl" 
            />
            <div className="p-8 space-y-4">
              <h3 className="text-2xl font-bold text-date-primary">Interactive Date Invitations</h3>
              <p className="text-gray-600">
                Send beautiful invitations and let your date respond with their preferences, all in one seamless experience.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works - Simple Version */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-date-primary">Simply Better Dating</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2">
              Our app makes planning dates effortless and fun for both parties
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 bg-date-primary/10 rounded-full flex items-center justify-center mb-6">
                <Calendar className="h-7 w-7 text-date-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Send Invitations</h3>
              <p className="text-gray-600">
                Create and send personalized date invitations with just a few clicks
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 bg-date-primary/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-7 w-7 text-date-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Collect Preferences</h3>
              <p className="text-gray-600">
                Your date can respond with their preferences for time, food, and entertainment
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 bg-date-primary/10 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="h-7 w-7 text-date-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enjoy Your Date</h3>
              <p className="text-gray-600">
                All responses are saved to your dashboard, so you can plan the perfect date
              </p>
            </div>
          </div>
        </div>
        
        {/* Testimonial */}
        <div className="bg-gradient-to-r from-date-primary/5 to-date-accent/5 rounded-2xl p-10 md:p-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-xl md:text-2xl font-medium text-gray-700 italic mb-6">
              "This app transformed our dating experience! Now there's no more confusion about what we both want to do or where we want to go."
            </p>
            <div className="flex justify-center">
              <div className="flex flex-col items-center">
                <p className="font-semibold text-date-primary">Michael & Sarah</p>
                <p className="text-sm text-gray-500">Dating for 2 years</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center py-10">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Dating Life?</h2>
          <Link to="/auth">
            <Button size="lg" className="gap-2">
              Get Started Today <Heart className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
