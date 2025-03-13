
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Film } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Movie {
  id: string;
  title: string;
}

interface MovieSelectionProps {
  onSelect: (movie: Movie) => void;
  selectedMovie: Movie | null;
}

const popularMovies: Movie[] = [
  { id: 'notebook', title: 'The Notebook' },
  { id: 'lalaland', title: 'La La Land' },
  { id: 'titanic', title: 'Titanic' },
  { id: 'beforeSunrise', title: 'Before Sunrise' },
  { id: 'walkToRemember', title: 'A Walk to Remember' },
  { id: 'chhakkapanja', title: 'Chhakka Panja' },
  { id: 'october', title: 'October' },
  { id: 'swasthani', title: 'Prasad' },
];

const MovieSelection: React.FC<MovieSelectionProps> = ({ onSelect, selectedMovie }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customMovie, setCustomMovie] = useState('');

  const filteredMovies = popularMovies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCustomMovieSelect = () => {
    if (customMovie.trim()) {
      onSelect({ id: 'custom', title: customMovie.trim() });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search for a movie or enter your own..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCustomMovie(e.target.value);
          }}
          className="pl-10 pr-4 py-3 rounded-full border-gray-200"
        />
      </div>

      <h3 className="text-sm font-medium text-gray-500 mb-3">Popular Choices</h3>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {filteredMovies.map(movie => (
          <div
            key={movie.id}
            onClick={() => onSelect(movie)}
            className={cn(
              "p-3 rounded-lg border cursor-pointer transition-all",
              selectedMovie?.id === movie.id
                ? "border-date-primary bg-date-primary/5"
                : "border-gray-200 hover:border-date-primary/50"
            )}
          >
            <div className="flex items-center gap-2">
              <Film className="h-4 w-4 text-date-primary" />
              <span className="text-sm">{movie.title}</span>
            </div>
          </div>
        ))}
      </div>
      
      {searchTerm && filteredMovies.length === 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Can't find your movie?</h3>
          <div className="flex gap-2">
            <Input
              type="text"
              value={customMovie}
              onChange={(e) => setCustomMovie(e.target.value)}
              placeholder="Enter a movie title"
              className="rounded-full border-gray-200"
            />
            <Button 
              onClick={handleCustomMovieSelect}
              className="btn-primary px-4"
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSelection;
