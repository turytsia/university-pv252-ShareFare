import React from 'react';
import { CATEGORIES } from './constants';

interface CategoryFiltersProps {
    categoryFilter: string;
    setCategoryFilter: (category: string) => void;
    showMyItems: boolean;
    setShowMyItems: (show: boolean) => void;
    showExpired: boolean;
    setShowExpired: (show: boolean) => void;
}

const SHOW_MY_ITEMS_ID = 'showMyItems';
const SHOW_EXPIRED_ID = 'showExpired';

export function CategoryFilters({
    categoryFilter,
    setCategoryFilter,
    showMyItems,
    setShowMyItems,
    showExpired,
    setShowExpired
}: CategoryFiltersProps) {
    return (
        <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide flex-1">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${categoryFilter === cat ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id={SHOW_MY_ITEMS_ID}
                        checked={showMyItems}
                        onChange={(e) => setShowMyItems(e.target.checked)}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                    />
                    <label htmlFor={SHOW_MY_ITEMS_ID} className="text-sm text-gray-700">Include my items</label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id={SHOW_EXPIRED_ID}
                        checked={showExpired}
                        onChange={(e) => setShowExpired(e.target.checked)}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                    />
                    <label htmlFor={SHOW_EXPIRED_ID} className="text-sm text-gray-700">Show expired</label>
                </div>
            </div>
        </div>
    );
}
