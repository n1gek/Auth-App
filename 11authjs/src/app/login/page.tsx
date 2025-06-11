'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/router';  
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';   
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';


export default function LoginPage() {
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });

    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault(); }


 return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-100 p-4">
      <div className="bg-white shadow-2xl rounded-3xl max-w-sm w-full p-8 flex flex-col items-center space-y-6">
        {/* Illustration Placeholder */}
        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 font-bold text-xl">
          {/* Replace this with <Image /> from next/image if you have an SVG or PNG */}
          Logo
        </div>

        <h2 className="text-2xl font-semibold text-gray-800">Login to Your Account</h2>

        <form className="w-full space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <div className='relative'>
               <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
              placeholder="you@example.com"
              className=" pl-10 w-full text-black px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            </div>
            
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <div className='relative'>
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                      type="password"
                      id="password"
                      value={user.password}
                      onChange={(e) => setUser({...user, password: e.target.value})}    
                      placeholder="••••••••••••"
                      className="pl-10 text-black w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
            </div>
            
          </div>

          <div className="text-right text-sm">
            <a href="#" className="text-indigo-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-xl hover:bg-indigo-600 transition duration-200"
            onClick={onLogin}
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-gray-600">
          Don’t have an account?{' '}
          <a href="#" className="text-indigo-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}