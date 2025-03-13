
import React, { useState, useEffect } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';
import StepSix from './StepSix';
import { Button } from '@/components/ui/button';

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

interface DateDetails {
  dateTime: Date;
  food: Food;
  movie: Movie;
  excitementLevel: number;
}

interface DateInvitationProps {
  isHomepageDemo?: boolean;
  isInvitationView?: boolean;
  dateData?: any;
  onAccept?: () => void;
  onDecline?: () => void;
}

const DateInvitation: React.FC<DateInvitationProps> = ({ 
  isHomepageDemo = false, 
  isInvitationView = false,
  dateData = null,
  onAccept,
  onDecline
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [response, setResponse] = useState<'yes' | 'no' | null>(null);
  const [dateDetails, setDateDetails] = useState<DateDetails>({
    dateTime: dateData?.date_time ? new Date(dateData.date_time) : new Date(),
    food: dateData?.food || { id: '', name: '' },
    movie: dateData?.movie || { id: '', title: '' },
    excitementLevel: dateData?.excitement_level || 5
  });

  // For homepage demo, we want to show the steps in sequence automatically
  useEffect(() => {
    if (isHomepageDemo && currentStep < 6) {
      const timer = setTimeout(() => {
        if (currentStep === 1) {
          setResponse('yes');
        }
        setCurrentStep(prev => prev < 6 ? prev + 1 : prev);
      }, 5000); // Auto-advance every 5 seconds for the demo
      return () => clearTimeout(timer);
    }
  }, [isHomepageDemo, currentStep]);

  useEffect(() => {
    if (isInvitationView && dateData) {
      // For invitation view, we want to initialize with the data from Supabase
      setDateDetails({
        dateTime: dateData.date_time ? new Date(dateData.date_time) : new Date(),
        food: dateData.food || { id: '', name: '' },
        movie: dateData.movie || { id: '', title: '' },
        excitementLevel: dateData.excitement_level || 5
      });
    }
  }, [isInvitationView, dateData]);

  const handleYesResponse = () => {
    setResponse('yes');
    if (isInvitationView && onAccept) {
      onAccept();
    } else {
      setCurrentStep(2);
    }
  };

  const handleNoResponse = () => {
    setResponse('no');
    if (isInvitationView && onDecline) {
      onDecline();
    }
    // No further steps for "no" response
  };

  const handleDateTimeSelection = (dateTime: Date) => {
    setDateDetails(prev => ({ ...prev, dateTime }));
    setCurrentStep(3);
  };

  const handleFoodSelection = (food: Food) => {
    setDateDetails(prev => ({ ...prev, food }));
    setCurrentStep(4);
  };

  const handleMovieSelection = (movie: Movie) => {
    setDateDetails(prev => ({ ...prev, movie }));
    setCurrentStep(5);
  };

  const handleExcitementSelection = (excitementLevel: number) => {
    setDateDetails(prev => ({ ...prev, excitementLevel }));
    setCurrentStep(6);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setResponse(null);
    setDateDetails({
      dateTime: new Date(),
      food: { id: '', name: '' },
      movie: { id: '', title: '' },
      excitementLevel: 5
    });
  };

  const renderStep = () => {
    if (response === 'no') {
      // The animation is handled in StepOne
      return null;
    }

    if (isInvitationView && dateData) {
      // For invitation view, we directly show the first step with the data
      return <StepOne onYes={handleYesResponse} onNo={handleNoResponse} isInvitationView={true} inviterName={dateData.inviter_name || "Someone special"} />;
    }

    switch (currentStep) {
      case 1:
        return <StepOne onYes={handleYesResponse} onNo={handleNoResponse} />;
      case 2:
        return <StepTwo onNext={handleDateTimeSelection} />;
      case 3:
        return <StepThree onNext={handleFoodSelection} />;
      case 4:
        return <StepFour onNext={handleMovieSelection} />;
      case 5:
        return <StepFive onNext={handleExcitementSelection} />;
      case 6:
        return <StepSix dateDetails={dateDetails} onRestart={handleRestart} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl mx-auto">
        {renderStep()}
      </div>
    </div>
  );
};

export default DateInvitation;
