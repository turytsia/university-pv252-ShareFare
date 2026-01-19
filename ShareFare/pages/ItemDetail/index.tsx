import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { ItemImageHeader } from './ItemImageHeader';
import { ItemInfo } from './ItemInfo';
import { OwnerSection } from './OwnerSection';
import { ClaimButton } from './ClaimButton';

export const ItemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { items, users, claimItem, contactOwner, currentUser } = useAppContext();

    const item = items.find(i => i.id === id);

    if (!item) {
        return <div>Item not found</div>;
    }

    const owner = users[item.ownerId];
    const isOwner = item.ownerId === currentUser?.id;

    const handleClaim = () => {
        const convId = claimItem(item.id);
        navigate(`/messages/${convId}`);
    };

    const handleContactOwner = () => {
        const convId = contactOwner(item.id);
        navigate(`/messages/${convId}`);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <ItemImageHeader item={item} onBack={handleBack} />

            <div className="p-6 md:p-8">
                <ItemInfo item={item} />

                <div className="border-t border-gray-100 pt-6">
                    <OwnerSection
                        owner={owner}
                        item={item}
                        isOwner={isOwner}
                        onContactOwner={handleContactOwner}
                    />
                    <ClaimButton item={item} isOwner={isOwner} onClaim={handleClaim} />
                </div>
            </div>
        </div>
    );
};
