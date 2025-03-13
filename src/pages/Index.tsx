
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Heart, Calendar, Plus, Check, Star, User, Mail, LockClosed } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Render different content based on authentication state
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            <span className="block">Make Date Night</span>
            <span className="block text-date-primary">Special Again</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Beautiful, interactive date invitations that make asking someone out exciting, memorable, and fun.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="px-8">
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Use DateInvite?
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Asking someone out should feel special, not boring
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-date-primary text-white">
                    <Heart className="h-6 w-6" />
                  </div>
                  Interactive Experience
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Fun, animated date invitations that bring joy to asking someone out and receiving invites.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-date-primary text-white">
                    <Calendar className="h-6 w-6" />
                  </div>
                  All Details In One Place
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Date, time, food plans, movie choices - everything neatly organized in one invitation.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-date-primary text-white">
                    <Star className="h-6 w-6" />
                  </div>
                  Memorable Moments
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Create date invitations that are as special as your relationship and the moments you'll share.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-date-primary text-white">
                    <Check className="h-6 w-6" />
                  </div>
                  Simple To Use
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  No design skills needed. Just answer a few questions and we'll create a beautiful invitation for you.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-date-primary">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to make your next date special?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-pink-100">
              Sign up and create your first date invitation in minutes.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" variant="secondary">
                <Link to="/auth">Create Your First Invitation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Users Are Saying
            </h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col justify-between rounded-2xl bg-gray-50 p-8">
              <div>
                <div className="flex gap-x-1 text-date-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 flex-none" />
                  ))}
                </div>
                <div className="mt-6 text-lg leading-8 text-gray-600">
                  "My girlfriend was absolutely delighted by the invitation. Much better than just sending a text message!"
                </div>
              </div>
              <div className="mt-8 flex items-center gap-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Michael T.</div>
                  <div className="text-gray-600">New York, USA</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-2xl bg-gray-50 p-8">
              <div>
                <div className="flex gap-x-1 text-date-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 flex-none" />
                  ))}
                </div>
                <div className="mt-6 text-lg leading-8 text-gray-600">
                  "We've been together for 5 years and this app helped me make our anniversary date feel special again!"
                </div>
              </div>
              <div className="mt-8 flex items-center gap-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah K.</div>
                  <div className="text-gray-600">London, UK</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-2xl bg-gray-50 p-8">
              <div>
                <div className="flex gap-x-1 text-date-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 flex-none" />
                  ))}
                </div>
                <div className="mt-6 text-lg leading-8 text-gray-600">
                  "I was so nervous about asking my crush out. This made it so much easier and more fun!"
                </div>
              </div>
              <div className="mt-8 flex items-center gap-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">James L.</div>
                  <div className="text-gray-600">Toronto, Canada</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
