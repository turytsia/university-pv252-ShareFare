import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Item } from '../../types';

interface ItemImageHeaderProps {
    item: Item;
    onBack: () => void;
}

export function ItemImageHeader({ item, onBack }: ItemImageHeaderProps) {
    return (
        <div className="relative h-64 md:h-80">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            <button
                onClick={onBack}
                className="absolute top-4 left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
            >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium uppercase shadow-sm">
                {item.status}
            </div>
        </div>
    );
}
