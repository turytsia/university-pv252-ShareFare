import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../../components/Button';
import { AddItemFormData } from './types';
import { AddItemHeader } from './AddItemHeader';
import { PhotoUpload } from './PhotoUpload';
import { FormFields } from './FormFields';
import { validateImageFile, readFileAsDataUrl, generatePlaceholderImageUrl, toggleArrayItem } from './utils';
import { DEFAULT_CATEGORY, DEFAULT_PICKUP_TIME, DEFAULT_LOCATION, SUBMIT_DELAY_MS } from './constants';

const INITIAL_FORM_DATA: AddItemFormData = {
    title: '',
    description: '',
    category: DEFAULT_CATEGORY,
    quantity: '',
    expiryDate: '',
    pickupTime: '',
    image: '',
    tags: []
};

export const AddItem = () => {
    const { addItem, updateItem, items, currentUser } = useAppContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<AddItemFormData>(INITIAL_FORM_DATA);

    useEffect(() => {
        if (isEditing && id) {
            const item = items.find(i => i.id === id);
            if (item) {
                setFormData({
                    title: item.title,
                    description: item.description,
                    category: item.category,
                    quantity: item.quantity,
                    expiryDate: item.expiryDate,
                    pickupTime: item.pickupTime,
                    image: item.image,
                    tags: item.tags
                });
            }
        }
    }, [id, isEditing, items]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            if (isEditing && id) {
                updateItem(id, formData);
                navigate('/profile');
            } else {
                addItem({
                    title: formData.title,
                    description: formData.description,
                    quantity: formData.quantity,
                    expiryDate: formData.expiryDate,
                    category: formData.category,
                    image: formData.image || generatePlaceholderImageUrl(),
                    tags: formData.tags,
                    pickupTime: formData.pickupTime || DEFAULT_PICKUP_TIME,
                    locationName: currentUser?.location || DEFAULT_LOCATION
                });
                navigate('/');
            }
            setLoading(false);
        }, SUBMIT_DELAY_MS);
    };

    const handleFieldChange = (field: keyof AddItemFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleTagToggle = (tag: string) => {
        setFormData(prev => ({
            ...prev,
            tags: toggleArrayItem(prev.tags, tag)
        }));
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        const validation = validateImageFile(file);
        if (!validation.valid) {
            alert(validation.error);
            return;
        }

        const dataUrl = await readFileAsDataUrl(file);
        setFormData(prev => ({ ...prev, image: dataUrl }));
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <AddItemHeader isEditing={isEditing} onBack={handleBack} />

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                <PhotoUpload image={formData.image} onFileSelect={handleFileSelect} />
                <FormFields
                    formData={formData}
                    onFieldChange={handleFieldChange}
                    onTagToggle={handleTagToggle}
                />

                <div className="pt-4">
                    <Button fullWidth size="lg" type="submit" disabled={loading}>
                        {loading ? 'Saving...' : (isEditing ? 'Update Item' : 'Post Item')}
                    </Button>
                </div>
            </form>
        </div>
    );
};
