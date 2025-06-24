'use client';
import Link from "next/link";
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: ''
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log("Signup response:", response.data);
      toast.success('Signup successful!');
      router.push('/login'); // Redirect after successful signup
    } catch (error: any) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setButtonDisabled(
      !(user.email.length > 0 && 
        user.password.length > 0 && 
        user.username.length > 0)
    );
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <form onSubmit={onSignUp} className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {loading ? 'Loading...' : 'Create Account'}
        </h2>

        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">User Name</label>
          <div className="relative">
            <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full pl-10 text-black pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={buttonDisabled || loading}
          className={`w-full py-2 rounded-xl transition duration-200 bg-indigo-700 text-white ${
            buttonDisabled || loading 
              ? 'bg-indigo-400 opacity-50 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {loading ? 'Processing...' : 'Sign Up'}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}