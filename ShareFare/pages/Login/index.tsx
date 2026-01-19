import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { LoginHeader } from './LoginHeader';
import { LoginForm } from './LoginForm';
import { SocialLogin } from './SocialLogin';

export const Login = () => {
    const { login } = useAppContext();
    const [email, setEmail] = useState('you@example.com');
    const [password, setPassword] = useState('password');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <LoginHeader />
                <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    onSubmit={login}
                />
                <SocialLogin />
            </div>
        </div>
    );
};
