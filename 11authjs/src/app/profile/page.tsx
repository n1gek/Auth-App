'use client';
import Link from 'next/link';

export default function ProfilePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-100 p-4">
            <div className="bg-white shadow-2xl rounded-3xl max-w-sm w-full p-8 flex flex-col items-center space-y-6">
                {/* Illustration Placeholder */}
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 font-bold text-xl">
                    {/* Replace this with <Image /> from next/image if you have an SVG or PNG */}
                    Logo
                </div>

                <h2 className="text-2xl font-semibold text-gray-800">Profile Page</h2>

                <p className="text-gray-600">This is your profile page. You can view and edit your details</p>
            </div>
        </div>
    );
}