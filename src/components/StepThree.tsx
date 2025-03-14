
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Utensils } from 'lucide-react';
import FoodCard from './FoodCard';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';

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
    gif: 'https://media.giphy.com/media/3o7abB06u9bNzA8lu8/giphy.gif'
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
    gif: 'https://media.giphy.com/media/l4FGlLdioAwHrVcHK/giphy.gif'
  },
  {
    id: 'sekuwa',
    name: 'Sekuwa (Grilled Meat)',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop',
    gif: 'https://media.giphy.com/media/giQFkQsM3oCaI/giphy.gif'
  }
];

const StepThree: React.FC<StepThreeProps> = ({ onNext }) => {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [customFood, setCustomFood] = useState('');

  const filteredFoods = foods.filter(food => 
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedFood) {
      onNext(selectedFood);
    }
  };

  const handleCustomFoodSelect = () => {
    if (customFood.trim()) {
      const newFood = {
        id: 'custom',
        name: customFood.trim(),
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080',
        gif: 'https://media.giphy.com/media/lPAEpmzfoOQ9eaQgii/giphy.gif'
      };
      setSelectedFood(newFood);
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

      <div className="w-full max-w-md mx-auto mb-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Utensils className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search for food or enter your own..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCustomFood(e.target.value);
            }}
            className="pl-10 pr-4 py-3 rounded-full border-gray-200"
          />
        </div>

        <h3 className="text-sm font-medium text-gray-500 mb-3">Popular Choices</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              onClick={() => setSelectedFood(food)}
              className={cn(
                "p-3 rounded-lg border cursor-pointer transition-all",
                selectedFood?.id === food.id
                  ? "border-date-primary bg-date-primary/5"
                  : "border-gray-200 hover:border-date-primary/50"
              )}
            >
              <div className="flex items-center gap-2">
                <Utensils className="h-4 w-4 text-date-primary" />
                <span className="text-sm">{food.name}</span>
              </div>
            </div>
          ))}
        </div>
        
        {searchTerm && filteredFoods.length === 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Can't find your favorite food?</h3>
            <div className="flex gap-2">
              <Input
                type="text"
                value={customFood}
                onChange={(e) => setCustomFood(e.target.value)}
                placeholder="Enter food name"
                className="rounded-full border-gray-200"
              />
              <Button 
                onClick={handleCustomFoodSelect}
                className="btn-primary px-4"
              >
                Add
              </Button>
            </div>
          </div>
        )}
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
