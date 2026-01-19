import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
}

export function SearchBar({ searchTerm, setSearchTerm, showFilters, setShowFilters }: SearchBarProps) {
    return (
        <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search for items..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg border ${showFilters ? 'bg-primary-50 border-primary-500 text-primary-600' : 'bg-white border-gray-200 text-gray-600'}`}
            >
                <Filter className="w-5 h-5" />
            </button>
        </div>
    );
}
