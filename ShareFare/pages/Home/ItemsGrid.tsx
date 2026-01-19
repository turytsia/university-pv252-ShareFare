import React from 'react';
import { Item, User } from '../../types';
import { ItemCard } from '../../components/ItemCard';

interface ItemsGridProps {
    items: Array<Item>;
    users: Record<string, User>;
    currentUserId: string | undefined;
}

export function ItemsGrid({ items, users, currentUserId }: ItemsGridProps) {
    return (
        <>
            <p className="text-sm text-gray-500 mb-4">{items.length} items available near you</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        owner={users[item.ownerId]}
                        isOwner={item.ownerId === currentUserId}
                    />
                ))}
            </div>
        </>
    );
}
