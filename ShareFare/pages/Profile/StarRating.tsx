import React from 'react';
import { Star } from 'lucide-react';
import { STAR_COUNT } from './constants';

interface StarRatingProps {
    rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
    return (
        <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: STAR_COUNT }, (_, i) => i + 1).map((star) => (
                <Star
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-400/50 text-yellow-400'}`}
                />
            ))}
            <span className="text-sm text-gray-600 ml-1">{rating}</span>
        </div>
    );
}
