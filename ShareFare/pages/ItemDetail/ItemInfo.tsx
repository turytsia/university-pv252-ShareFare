import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { Item } from '../../types';

interface ItemInfoProps {
    item: Item;
}

export function ItemInfo({ item }: ItemInfoProps) {
    return (
        <>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h1>
            <p className="text-gray-500 mb-6">{item.quantity} • {item.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
                {item.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                        <Clock className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">Pickup Window</p>
                        <p className="text-sm text-gray-500">{item.pickupTime}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                        <MapPin className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">Location</p>
                        <p className="text-sm text-gray-500">{item.distance} mi away</p>
                        <p className="text-xs text-gray-400">Exact address shared after claiming</p>
                    </div>
                </div>
            </div>
        </>
    );
}
