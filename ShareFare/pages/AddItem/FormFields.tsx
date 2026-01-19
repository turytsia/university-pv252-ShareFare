import React from 'react';
import { DietaryType } from '../../types';
import { AddItemFormData } from './types';
import { CATEGORIES, DESCRIPTION_TEXTAREA_ROWS } from './constants';

interface FormFieldsProps {
    formData: AddItemFormData;
    onFieldChange: (field: keyof AddItemFormData, value: string) => void;
    onTagToggle: (tag: string) => void;
}

export function FormFields({ formData, onFieldChange, onTagToggle }: FormFieldsProps) {
    return (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Title *</label>
                <input
                    required
                    type="text"
                    placeholder="e.g. Fresh Garden Tomatoes"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 text-gray-900"
                    value={formData.title}
                    onChange={e => onFieldChange('title', e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900"
                        value={formData.category}
                        onChange={e => onFieldChange('category', e.target.value)}
                    >
                        {CATEGORIES.map(c => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                    <input
                        required
                        type="text"
                        placeholder="e.g. 3 lbs"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900"
                        value={formData.quantity}
                        onChange={e => onFieldChange('quantity', e.target.value)}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                    rows={DESCRIPTION_TEXTAREA_ROWS}
                    placeholder="Share more details about the food, condition, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900"
                    value={formData.description}
                    onChange={e => onFieldChange('description', e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                    <input
                        type="text"
                        placeholder="e.g. Nov 12"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                        value={formData.expiryDate}
                        onChange={e => onFieldChange('expiryDate', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time</label>
                    <input
                        type="text"
                        placeholder="e.g. Today 5-8pm"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                        value={formData.pickupTime}
                        onChange={e => onFieldChange('pickupTime', e.target.value)}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Tags</label>
                <div className="flex flex-wrap gap-2">
                    {Object.values(DietaryType).map(tag => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => onTagToggle(tag)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${formData.tags.includes(tag)
                                ? 'bg-primary-50 border-primary-500 text-primary-700'
                                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
