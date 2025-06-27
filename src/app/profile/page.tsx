'use client';

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-100 p-4">
      <div className="bg-white shadow-2xl rounded-3xl max-w-sm w-full p-8 flex flex-col items-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
        <p className="text-gray-600">Welcome to your profile page!</p>
        {/* Add more profile details here */}
      </div>
    </div>
  );
}