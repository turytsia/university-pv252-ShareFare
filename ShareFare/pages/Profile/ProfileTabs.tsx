import React from 'react';
import { ProfileTab, Item } from '../../types';
import { ProfileItemCard } from '../../components/ProfileItemCard';
import { EmptyItemsState } from './EmptyItemsState';
import { PROFILE_TABS } from './constants';

interface ProfileTabsProps {
    activeTab: ProfileTab;
    setActiveTab: (tab: ProfileTab) => void;
    displayItems: Array<Item>;
}

export function ProfileTabs({ activeTab, setActiveTab, displayItems }: ProfileTabsProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
            <div className="flex border-b border-gray-200">
                {PROFILE_TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-4 text-sm font-medium border-b-2 capitalize transition-colors ${activeTab === tab ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab} Items
                    </button>
                ))}
            </div>

            <div className="p-6">
                {displayItems.length === 0 ? (
                    <EmptyItemsState activeTab={activeTab} />
                ) : (
                    <div className="space-y-4">
                        {displayItems.map(item => (
                            <ProfileItemCard key={item.id} item={item} activeTab={activeTab} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
