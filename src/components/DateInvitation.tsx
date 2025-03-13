
import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';
import StepSix from './StepSix';

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

const DateInvitation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [response, setResponse] = useState<'yes' | 'no' | null>(null);
  const [dateDetails, setDateDetails] = useState<DateDetails>({
    dateTime: new Date(),
    food: { id: '', name: '' },
    movie: { id: '', title: '' },
    excitementLevel: 5
  });

  const handleYesResponse = () => {
    setResponse('yes');
    setCurrentStep(2);
  };

  const handleNoResponse = () => {
    setResponse('no');
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
