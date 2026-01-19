import React from 'react';
import { Item, ItemStatus } from '../../types';
import { Button } from '../../components/Button';

interface ClaimButtonProps {
    item: Item;
    isOwner: boolean;
    onClaim: () => void;
}

export function ClaimButton({ item, isOwner, onClaim }: ClaimButtonProps) {
    if (isOwner) {
        return <Button fullWidth disabled>You own this item</Button>;
    }

    if (item.status === ItemStatus.AVAILABLE) {
        return <Button fullWidth size="lg" onClick={onClaim}>Claim Item</Button>;
    }

    return <Button fullWidth disabled variant="secondary">Not Available</Button>;
}
