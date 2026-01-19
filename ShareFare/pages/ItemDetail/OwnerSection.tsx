import React from 'react';
import { CheckCircle } from 'lucide-react';
import { User, Item } from '../../types';
import { Button } from '../../components/Button';
import { DEFAULT_COMPLETION_RATE } from './constants';

interface OwnerSectionProps {
    owner: User;
    item: Item;
    isOwner: boolean;
    onContactOwner: () => void;
}

export function OwnerSection({ owner, item, isOwner, onContactOwner }: OwnerSectionProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <img src={owner.avatar} className="w-12 h-12 rounded-full" alt={owner.name} />
                <div>
                    <p className="font-medium text-gray-900 flex items-center gap-1">
                        {owner.name}
                        {owner.verified && (
                            <span className="text-xs text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                                Verified
                            </span>
                        )}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        {item.completionRate || DEFAULT_COMPLETION_RATE}% completion
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-xs">Responds ~20 min</span>
                    </p>
                </div>
            </div>
            {!isOwner && (
                <Button variant="outline" onClick={onContactOwner}>
                    Contact
                </Button>
            )}
        </div>
    );
}
