
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { Slider } from '@/components/ui/slider';

interface StepFiveProps {
  onNext: (excitementLevel: number) => void;
}

const StepFive: React.FC<StepFiveProps> = ({ onNext }) => {
  const [excitement, setExcitement] = useState<number>(5);

  const getExcitementGif = (level: number) => {
    if (level <= 3) {
      return "https://media.giphy.com/media/3o7TKqm1mNujcBPSpy/giphy.gif";
    } else if (level <= 7) {
      return "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif";
    } else {
      return "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif";
    }
  };

  const getExcitementText = (level: number) => {
    if (level <= 3) {
      return "Not too excited yet? That's okay!";
    } else if (level <= 7) {
      return "Looking forward to it!";
    } else {
      return "Super excited! Can't wait!";
    }
  };

  const handleContinue = () => {
    onNext(excitement);
  };

  const handleSliderChange = (value: number[]) => {
    setExcitement(value[0]);
  };

  return (
    <div className="step-container">
      <h1 className="step-title animate-slide-up">How excited are you?</h1>
      <p className="step-subtitle animate-slide-up" style={{ animationDelay: '100ms' }}>
        Slide to show your hype level!
      </p>

      <AnimatedTransition
        show={true}
        animateIn="animate-scale-in"
        className="gif-container"
      >
        <img 
          src={getExcitementGif(excitement)} 
          alt="Excitement level" 
          className="w-full h-full object-cover"
        />
      </AnimatedTransition>

      <div className="w-full max-w-md mx-auto mb-2 px-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="flex justify-between mb-2 text-sm text-gray-500">
          <span>Meh</span>
          <span>OMG YES!</span>
        </div>
        <Slider
          defaultValue={[5]}
          max={10}
          min={1}
          step={1}
          onValueChange={handleSliderChange}
          value={[excitement]}
          className="excitement-slider"
        />
      </div>

      <div className="flex flex-col items-center mt-2 mb-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className="text-3xl font-bold mb-1">{excitement}/10</div>
        <div className="text-gray-600">{getExcitementText(excitement)}</div>
      </div>

      <div className="w-full flex justify-center mt-2 animate-slide-up" style={{ animationDelay: '400ms' }}>
        <Button
          onClick={handleContinue}
          className="btn-primary flex items-center gap-2"
        >
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default StepFive;
