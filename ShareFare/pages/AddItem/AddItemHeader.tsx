import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface AddItemHeaderProps {
    isEditing: boolean;
    onBack: () => void;
}

export function AddItemHeader({ isEditing, onBack }: AddItemHeaderProps) {
    return (
        <div className="flex items-center gap-2 mb-6">
            <button onClick={onBack}>
                <ChevronLeft className="w-6 h-6 text-gray-500" />
            </button>
            <div>
                <h1 className="text-xl font-bold text-gray-900">
                    {isEditing ? 'Edit Item' : 'Share Food'}
                </h1>
                <p className="text-sm text-gray-500">
                    {isEditing ? 'Update your item details' : 'Help reduce waste in your community'}
                </p>
            </div>
        </div>
    );
}
