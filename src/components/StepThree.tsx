
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import FoodCard from './FoodCard';
import AnimatedTransition from './AnimatedTransition';

interface Food {
  id: string;
  name: string;
  image: string;
  gif: string;
}

interface StepThreeProps {
  onNext: (food: Food) => void;
}

const foods: Food[] = [
  {
    id: 'momo',
    name: 'Momo (Dumplings)',
    image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=2070&auto=format&fit=crop',
    gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGZ3Z2RtcW9hMWN2MGxicDNnN2p1dGg1eDVlbXh6Z29nbGFjdHV3cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7abB06u9bNzA8lu8/giphy.gif'
  },
  {
    id: 'pizza',
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop',
    gif: 'https://media.giphy.com/media/4ayiIWaq2VULC/giphy.gif'
  },
  {
    id: 'newari',
    name: 'Newari Khaja Set',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2071&auto=format&fit=crop',
    gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDhvaWl1bGRrZjBxbGxrOWhjYTZpdnA4a3VyYnlsYzFvaWplaGVwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4FGlLdioAwHrVcHK/giphy.gif'
  },
  {
    id: 'sekuwa',
    name: 'Sekuwa (Grilled Meat)',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop',
    gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDJseDN0YzNkbXdiODBxd3o2aGhmaGhvYXRiaTI5ZG5xcXpzcW5jayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/giQFkQsM3oCaI/giphy.gif'
  }
];

const StepThree: React.FC<StepThreeProps> = ({ onNext }) => {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const handleContinue = () => {
    if (selectedFood) {
      onNext(selectedFood);
    }
  };

  return (
    <div className="step-container">
      <h1 className="step-title animate-slide-up">What's on the Menu?</h1>
      <p className="step-subtitle animate-slide-up" style={{ animationDelay: '100ms' }}>
        Pick something delicious for our date
      </p>

      <AnimatedTransition
        show={!!selectedFood}
        animateIn="animate-scale-in"
        className="gif-container"
      >
        {selectedFood && (
          <img 
            src={selectedFood.gif} 
            alt={selectedFood.name} 
            className="w-full h-full object-cover"
          />
        )}
      </AnimatedTransition>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full max-w-md mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
        {foods.map((food) => (
          <FoodCard 
            key={food.id}
            name={food.name}
            image={food.image}
            isSelected={selectedFood?.id === food.id}
            onClick={() => setSelectedFood(food)}
          />
        ))}
      </div>

      <div className="w-full flex justify-center mt-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <Button
          onClick={handleContinue}
          className="btn-primary flex items-center gap-2"
          disabled={!selectedFood}
        >
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default StepThree;
