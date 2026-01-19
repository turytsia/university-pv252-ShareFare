import React from 'react';
import { Button } from '../../components/Button';

interface LoginFormProps {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    onSubmit: () => void;
}

export function LoginForm({ email, setEmail, password, setPassword, onSubmit }: LoginFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                />
            </div>
            <div>
                <div className="flex justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <a href="#" className="text-sm text-primary-600 hover:text-primary-700">Forgot password?</a>
                </div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                />
            </div>
            <Button fullWidth type="submit" size="lg">Sign In</Button>
        </form>
    );
}
