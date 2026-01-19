import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../../components/Button';
import { User } from '../../types';

interface EditProfileViewProps {
    currentUser: User;
    editName: string;
    setEditName: (name: string) => void;
    editBio: string;
    setEditBio: (bio: string) => void;
    onCancel: () => void;
    onSave: () => void;
}

const BIO_TEXTAREA_ROWS = 3;

export function EditProfileView({
    currentUser,
    editName,
    setEditName,
    editBio,
    setEditBio,
    onCancel,
    onSave
}: EditProfileViewProps) {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <button onClick={onCancel} className="flex items-center gap-2 text-gray-600">
                    <ChevronLeft className="w-5 h-5" /> Edit Profile
                </button>
                <Button onClick={onSave}>Save Changes</Button>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 border border-gray-100">
                <div className="flex items-center gap-6">
                    <img src={currentUser.avatar} className="w-24 h-24 rounded-full object-cover" alt="Avatar" />
                    <Button variant="outline">Upload Photo</Button>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                        rows={BIO_TEXTAREA_ROWS}
                    />
                </div>
            </div>
        </div>
    );
}
