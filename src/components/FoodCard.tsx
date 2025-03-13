
import React from 'react';
import { cn } from '@/lib/utils';

interface FoodCardProps {
  name: string;
  image: string;
  isSelected: boolean;
  onClick: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ name, image, isSelected, onClick }) => {
  return (
    <div 
      className={cn("food-card", isSelected && "selected")} 
      onClick={onClick}
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <img 
          src={image} 
          alt={name} 
          className="food-image transition-transform duration-300 hover:scale-110"
        />
        <div className="food-title">
          <h3>{name}</h3>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
