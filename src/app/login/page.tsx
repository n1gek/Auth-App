'use client';
import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';   
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { set } from 'mongoose';
import Img from 'next/image';


export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });


    const onLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    setLoading(true);
    const response = await axios.post('/api/users/login', user);
    console.log("Login Success", response.data);
    toast.success("Login Successful");
    
    // Confirm client side router push
    console.log('Routing to /profile');
    router.push(`/profile/${response.data.id}`);

  } catch (error: any) {
    console.log("Login Failed", error.message);
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};

      
    useEffect(() => {
      if (user.email.length > 0 && user.password.length > 0) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }, [user]);


 return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-100 p-4">
      
      <div className="bg-white shadow-2xl rounded-3xl max-w-sm w-full p-8 flex flex-col items-center space-y-6">

        <div className="w-24 h-24 bg-indigo-100 m-5 rounded-full flex items-center justify-center">
          <Img 
          width={100}
          height={100}
          className="object-cover rounded-full"
          src="/images/icon.jpeg" alt="Logo" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800">{loading ? "Loading..." : "Login"}</h2>

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
            disabled={buttonDisabled || loading}
            className={`w-full bg-indigo-500 text-white py-2 rounded-xl hover:bg-indigo-600 transition duration-200 
              ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onLogin}
          >
           Sign In
          </button>
        </form>

        <p className="text-sm text-gray-600">
          Don’t have an account?{' '}
          <a href="/signup" className="text-indigo-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}