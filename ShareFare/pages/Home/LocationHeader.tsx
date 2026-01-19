import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { formatCurrentDate } from './utils';

interface LocationHeaderProps {
    location: string | undefined;
}

export function LocationHeader({ location }: LocationHeaderProps) {
    return (
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-600" />
                <span>{location}</span>
                <button className="text-primary-600 font-medium hover:underline">Change</button>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-600" />
                <span>{formatCurrentDate()}</span>
            </div>
        </div>
    );
}
