
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays, Utensils, Film, Heart } from 'lucide-react';
import { format } from 'date-fns';
import AnimatedTransition from './AnimatedTransition';

interface DateDetails {
  dateTime: Date;
  food: {
    id: string;
    name: string;
  };
  movie: {
    id: string;
    title: string;
  };
  excitementLevel: number;
}

interface StepSixProps {
  dateDetails: DateDetails;
  onRestart: () => void;
}

const StepSix: React.FC<StepSixProps> = ({ dateDetails, onRestart }) => {
  return (
    <div className="step-container">
      <h1 className="step-title animate-slide-up">It's a Date!</h1>
      <p className="step-subtitle animate-slide-up" style={{ animationDelay: '100ms' }}>
        See You Soon! Looking forward to it.
      </p>

      <AnimatedTransition
        show={true}
        animateIn="animate-scale-in"
        className="gif-container"
      >
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNno2bjk1ODB5MzRpbWZjZ2xpdWY0bXpoMnN0anhkYXg5MGh6OHVlbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cMPdlbcUKl3xkMCyOI/giphy.gif" 
          alt="See you soon" 
          className="w-full h-full object-cover"
        />
      </AnimatedTransition>

      <div className="w-full max-w-md mx-auto glass-card p-6 mb-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <h3 className="text-lg font-medium mb-4 text-center">Date Details</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-date-primary/10 p-2 rounded-full">
              <CalendarDays className="h-5 w-5 text-date-primary" />
            </div>
            <div>
              <h4 className="font-medium">When</h4>
              <p className="text-gray-600">{format(dateDetails.dateTime, "EEEE, MMMM d, yyyy 'at' h:mm aa")}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-date-primary/10 p-2 rounded-full">
              <Utensils className="h-5 w-5 text-date-primary" />
            </div>
            <div>
              <h4 className="font-medium">Food</h4>
              <p className="text-gray-600">{dateDetails.food.name}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-date-primary/10 p-2 rounded-full">
              <Film className="h-5 w-5 text-date-primary" />
            </div>
            <div>
              <h4 className="font-medium">Movie</h4>
              <p className="text-gray-600">{dateDetails.movie.title}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-date-primary/10 p-2 rounded-full">
              <Heart className="h-5 w-5 text-date-primary" />
            </div>
            <div>
              <h4 className="font-medium">Excitement Level</h4>
              <div className="flex items-center gap-1">
                <div className="h-2 bg-date-primary rounded-full" style={{ width: `${dateDetails.excitementLevel * 10}%` }}></div>
                <span className="text-sm text-gray-600">{dateDetails.excitementLevel}/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-2 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <Button
          onClick={onRestart}
          className="btn-outline"
        >
          Start Over
        </Button>
      </div>
    </div>
  );
};

export default StepSix;
