import React from 'react';

export function SocialLogin() {
    return (
        <>
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
                    Google
                </button>
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
                    GitHub
                </button>
            </div>
        </>
    );
}
