import React from 'react';
import { X, MapPin, CheckCircle, Leaf, ThumbsUp, Star, Clock } from 'lucide-react';
import { User } from '../types';

interface UserProfileModalProps {
    user: User;
    onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, onClose }) => {
    // Mock rating for display
    const mockRating = 4.5;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl w-full max-w-sm p-6 animate-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                        <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full border-2 border-white shadow-md" />
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
                                {user.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-4 h-4 ${star <= Math.floor(mockRating) ? 'fill-yellow-400 text-yellow-400' : star <= mockRating ? 'fill-yellow-400/50 text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                                <span className="text-sm text-gray-600 ml-1">{mockRating}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                    <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" /> 98% completion
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> ~20 min response
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 rounded-xl p-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                            <Leaf className="w-4 h-4" />
                        </div>
                        <p className="text-xl font-bold text-gray-900">{user.stats.shared}</p>
                        <p className="text-xs text-gray-500">Items Shared</p>
                    </div>
                    <div className="bg-red-50 rounded-xl p-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-red-500 mb-1">
                            <ThumbsUp className="w-4 h-4" />
                        </div>
                        <p className="text-xl font-bold text-gray-900">{user.stats.helped}</p>
                        <p className="text-xs text-gray-500">People Helped</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                            <Star className="w-4 h-4" />
                        </div>
                        <p className="text-xl font-bold text-gray-900">{user.stats.received}</p>
                        <p className="text-xs text-gray-500">Items Received</p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                            <Leaf className="w-4 h-4" />
                        </div>
                        <p className="text-xl font-bold text-gray-900">{user.stats.wasteReduced} lbs</p>
                        <p className="text-xs text-gray-500">Waste Reduced</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
