import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ProfileTab } from '../../types';
import { EditProfileView } from './EditProfileView';
import { ProfileHeader } from './ProfileHeader';
import { ProfileTabs } from './ProfileTabs';
import { getFilteredItems } from './utils';

export const Profile = () => {
    const { currentUser, items } = useAppContext();
    const [activeTab, setActiveTab] = useState<ProfileTab>(ProfileTab.POSTED);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(currentUser?.name || '');
    const [editBio, setEditBio] = useState('Student passionate about reducing food waste!');

    if (!currentUser) {
        return null;
    }

    const handleSaveProfile = () => {
        setIsEditing(false);
    };

    const displayItems = getFilteredItems(activeTab, items, currentUser.id);

    if (isEditing) {
        return (
            <EditProfileView
                currentUser={currentUser}
                editName={editName}
                setEditName={setEditName}
                editBio={editBio}
                setEditBio={setEditBio}
                onCancel={() => setIsEditing(false)}
                onSave={handleSaveProfile}
            />
        );
    }

    return (
        <div>
            <ProfileHeader
                currentUser={currentUser}
                editName={editName}
                editBio={editBio}
                onEditClick={() => setIsEditing(true)}
            />
            <ProfileTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                displayItems={displayItems}
            />
        </div>
    );
};
