import React from 'react';
import { CheckCircle, MapPin, Clock, Leaf, ThumbsUp, Star, Filter } from 'lucide-react';
import { Button } from '../../components/Button';
import { StatsCard } from '../../components/StatsCard';
import { User } from '../../types';
import { StarRating } from './StarRating';
import { DEFAULT_RATING } from './constants';

interface ProfileHeaderProps {
    currentUser: User;
    editName: string;
    editBio: string;
    onEditClick: () => void;
}

export function ProfileHeader({ currentUser, editName, editBio, onEditClick }: ProfileHeaderProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <img
                        src={currentUser.avatar}
                        alt="Profile"
                        className="w-20 h-20 rounded-full border-4 border-white shadow-sm"
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold text-gray-900">{editName}</h1>
                            {currentUser.verified && <CheckCircle className="w-5 h-5 text-blue-500" />}
                        </div>
                        <StarRating rating={DEFAULT_RATING} />
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {currentUser.location} • Member since Jan 2024
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="w-4 h-4" /> 98% completion
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" /> Responds ~20 min
                            </span>
                        </div>
                    </div>
                </div>
                <Button variant="outline" size="sm" onClick={onEditClick}>Edit Profile</Button>
            </div>

            <p className="mt-6 text-gray-600 text-sm max-w-2xl">{editBio}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <StatsCard icon={Leaf} value={currentUser.stats.shared} label="Items Shared" color="text-green-600" />
                <StatsCard icon={ThumbsUp} value={currentUser.stats.helped} label="People Helped" color="text-red-500" />
                <StatsCard icon={Star} value={currentUser.stats.received} label="Items Received" color="text-blue-500" />
                <StatsCard icon={Filter} value={`${currentUser.stats.wasteReduced} lbs`} label="Waste Reduced" color="text-orange-500" />
            </div>
        </div>
    );
}
