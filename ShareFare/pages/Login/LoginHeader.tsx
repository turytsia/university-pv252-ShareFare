import React from 'react';
import { Leaf } from 'lucide-react';

export function LoginHeader() {
    return (
        <>
            <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <Leaf className="w-6 h-6 text-primary-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">ShareFare</h1>
                <p className="text-gray-500 text-sm">Share food, reduce waste</p>
            </div>

            <h2 className="text-xl font-semibold text-center mb-2 text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 text-center mb-8 text-sm">Sign in to continue sharing and saving food</p>
        </>
    );
}
