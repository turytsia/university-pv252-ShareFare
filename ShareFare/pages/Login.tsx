import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/Button';

export const Login = () => {
  const { login } = useAppContext();
  const [email, setEmail] = useState('you@example.com');
  const [password, setPassword] = useState('password');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <Leaf className="w-6 h-6 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">ShareFare</h1>
          <p className="text-gray-500 text-sm">Share food, reduce waste</p>
        </div>
        
        <h2 className="text-xl font-semibold text-center mb-2 text-gray-900">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-8 text-sm">Sign in to continue sharing and saving food</p>

        <form onSubmit={(e) => { e.preventDefault(); login(); }} className="space-y-4">
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

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">Google</button>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">GitHub</button>
        </div>
      </div>
    </div>
  );
};
