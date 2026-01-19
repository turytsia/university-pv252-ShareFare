import React from 'react';
import { Camera } from 'lucide-react';
import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE_LABEL, PHOTO_INPUT_ID } from './constants';

interface PhotoUploadProps {
    image: string;
    onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PhotoUpload({ image, onFileSelect }: PhotoUploadProps) {
    const handlePhotoClick = () => {
        const input = document.getElementById(PHOTO_INPUT_ID) as HTMLInputElement;
        if (input) {
            input.click();
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photo *</label>
            {image ? (
                <div
                    className="relative h-48 rounded-xl overflow-hidden mb-2 group"
                    onClick={handlePhotoClick}
                >
                    <img src={image} className="w-full h-full object-cover" alt="Food preview" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-white font-medium">Change Photo</span>
                    </div>
                </div>
            ) : (
                <div
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={handlePhotoClick}
                >
                    <Camera className="w-8 h-8 mb-2 text-gray-400" />
                    <span className="text-sm font-medium">Click to upload food photo</span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG up to {MAX_FILE_SIZE_LABEL}</span>
                </div>
            )}
            <input
                id={PHOTO_INPUT_ID}
                type="file"
                accept={ALLOWED_IMAGE_TYPES}
                onChange={onFileSelect}
                className="hidden"
            />
        </div>
    );
}
