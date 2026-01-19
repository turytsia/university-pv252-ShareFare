import React from 'react';
import { Button } from '../../components/Button';
import { ProfileTab } from '../../types';

interface EmptyItemsStateProps {
    activeTab: ProfileTab;
}

const ADD_ITEM_ROUTE = '#/add';

export function EmptyItemsState({ activeTab }: EmptyItemsStateProps) {
    return (
        <div className="text-center py-10 text-gray-400">
            <p>No items found in this category.</p>
            {activeTab === ProfileTab.POSTED && (
                <Button className="mt-4" onClick={() => { window.location.hash = ADD_ITEM_ROUTE; }}>
                    Post an Item
                </Button>
            )}
        </div>
    );
}
