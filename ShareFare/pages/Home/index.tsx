import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { FilterPanel } from '../../components/FilterPanel';
import { ItemStatus } from '../../types';
import { isExpired } from '../../utils';
import { LocationHeader } from './LocationHeader';
import { SearchBar } from './SearchBar';
import { CategoryFilters } from './CategoryFilters';
import { ItemsGrid } from './ItemsGrid';
import { getInitialFilterState, saveFiltersToLocalStorage } from './utils';
import { DEFAULT_CATEGORY, DEFAULT_MAX_DISTANCE, DEFAULT_PICKUP_TIME } from './constants';

export const Home = () => {
    const { items, users, currentUser } = useAppContext();

    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState(DEFAULT_CATEGORY);
    const [showFilters, setShowFilters] = useState(false);
    const [maxDistance, setMaxDistance] = useState(DEFAULT_MAX_DISTANCE);
    const [dietary, setDietary] = useState<Array<string>>([]);
    const [pickupTime, setPickupTime] = useState(DEFAULT_PICKUP_TIME);
    const [onlyVerified, setOnlyVerified] = useState(false);
    const [showMyItems, setShowMyItems] = useState(() => getInitialFilterState('showMyItems', true));
    const [showExpired, setShowExpired] = useState(() => getInitialFilterState('showExpired', false));

    useEffect(() => {
        saveFiltersToLocalStorage({ showMyItems, showExpired });
    }, [showMyItems, showExpired]);

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const isAvailable = item.status === ItemStatus.AVAILABLE;
            const isMyPending = item.status === ItemStatus.PENDING && item.ownerId === currentUser?.id;

            if (!isAvailable && !isMyPending) {
                return false;
            }

            if (!showMyItems && item.ownerId === currentUser?.id) {
                return false;
            }

            if (!showExpired && isExpired(item.expiryDate)) {
                return false;
            }

            if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            if (categoryFilter !== DEFAULT_CATEGORY && item.category !== categoryFilter) {
                return false;
            }

            if (item.distance > maxDistance) {
                return false;
            }

            if (onlyVerified) {
                const owner = users[item.ownerId];
                if (!owner?.verified) {
                    return false;
                }
            }

            if (dietary.length > 0) {
                const hasAllTags = dietary.every(tag => item.tags.includes(tag));
                if (!hasAllTags) {
                    return false;
                }
            }

            return true;
        }).sort((a, b) => a.distance - b.distance);
    }, [items, searchTerm, categoryFilter, maxDistance, dietary, currentUser, onlyVerified, users, showMyItems, showExpired]);

    return (
        <div>
            <LocationHeader location={currentUser?.location} />

            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
            />

            <CategoryFilters
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                showMyItems={showMyItems}
                setShowMyItems={setShowMyItems}
                showExpired={showExpired}
                setShowExpired={setShowExpired}
            />

            {showFilters && (
                <FilterPanel
                    maxDistance={maxDistance}
                    setMaxDistance={setMaxDistance}
                    pickupTime={pickupTime}
                    setPickupTime={setPickupTime}
                    dietary={dietary}
                    setDietary={setDietary}
                    onlyVerified={onlyVerified}
                    setOnlyVerified={setOnlyVerified}
                    onClose={() => setShowFilters(false)}
                />
            )}

            <ItemsGrid
                items={filteredItems}
                users={users}
                currentUserId={currentUser?.id}
            />
        </div>
    );
};
