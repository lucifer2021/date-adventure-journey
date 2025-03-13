
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AnimatedTransition from './AnimatedTransition';

interface StepTwoProps {
  onNext: (dateTime: Date) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ onNext }) => {
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [isCalendarInteracting, setIsCalendarInteracting] = useState(false);

  const handleContinue = () => {
    if (dateTime) {
      onNext(dateTime);
    }
  };

  return (
    <div className="step-container">
      <h1 className="step-title animate-slide-up">When are you free?</h1>
      <p className="step-subtitle animate-slide-up" style={{ animationDelay: '100ms' }}>
        Pick a date and time for our adventure
      </p>

      <AnimatedTransition 
        show={isCalendarInteracting}
        animateIn="animate-scale-in"
        className="gif-container mb-6"
      >
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWNidXVpajR0bzUyZzNyZzQ2aXRybm9kaWU2Y3p0d25mZDVndWlsayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohhwJlKHfEqTm3Py0/giphy.gif"
          alt="Calendar animation"
          className="w-full h-full object-cover"
        />
      </AnimatedTransition>

      <div className="w-full max-w-md mx-auto mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div 
          className="calendar-wrapper w-full" 
          onMouseEnter={() => setIsCalendarInteracting(true)}
          onMouseLeave={() => setIsCalendarInteracting(false)}
        >
          <DatePicker
            selected={dateTime}
            onChange={(date: Date) => setDateTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
            inline
            className="w-full p-3 border border-gray-200 rounded-lg"
          />
        </div>
      </div>
      
      <div className="w-full flex justify-center mt-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <Button
          onClick={handleContinue}
          className="btn-primary flex items-center gap-2"
          disabled={!dateTime}
        >
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
