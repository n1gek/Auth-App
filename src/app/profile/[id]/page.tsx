"use client";

import Image from "next/image";
import { useRouter} from "next/navigation";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { Bell, LogOut, Calendar, FileText, User } from "lucide-react";
import { set } from "mongoose";

export default function StudentPortalPage() {
  const router = useRouter();
  const [data, setData] = React.useState<{
      _id: string;
      username: string;
      email: string;
    } | null>(null);


  const handleLogout = async() => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/");

      
    } catch (error:any) {
      console.log(error.message)
      toast.error("Logout failed: " + error.message);
    }
  };

  const getUserData = async () => {
    try {
       const res = await axios.get("/api/users/me")
    console.log(res.data);
    setData(res.data.data);
      
    } catch (error) {
      console.error("Error fetching user data:", error);
      // toast.error("Failed to fetch user data: " + error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-400 text-gray-800">
      {/* Header */}
      <header className="bg-gray-600 text-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Student Portal</h1>
          <div className="flex items-center gap-4">
            <Bell className="h-5 w-5" />
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center min-h-[300px]">
          <h2 className="mt-4 text-xl font-semibold"> Data: 
            {data ? data.username : "Loading..."}

          </h2>
          <button onClick={getUserData} className="bg-blue-500 text-white px-4 py-2 rounded-md">Fetch User Data</button>
          <p className="text-sm text-gray-500">undergrad@studentuniversity.edu</p>
          <p className="text-sm text-gray-500 mt-1">Major: Computer Science</p>
        </div>

        {/* Dashboard Items */}
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white shadow rounded-xl p-6 min-h-[300px]">
            <div className="flex items-center gap-4">
              <FileText className="h-6 w-6 text-indigo-500" />
              <div>
                <h3 className="font-semibold text-lg">Assignments</h3>
                <p className="text-sm text-gray-500">View upcoming and past due work</p>
              </div>
            </div>
            <button className="mt-4 w-full border border-indigo-500 text-indigo-500 rounded-md py-2 hover:bg-indigo-50">
              Go to Assignments
            </button>
          </div>

          <div className="bg-white shadow rounded-xl p-6 min-h-[300px]">
            <div className="flex items-center gap-4">
              <Calendar className="h-6 w-6 text-indigo-500" />
              <div>
                <h3 className="font-semibold text-lg">Calendar</h3>
                <p className="text-sm text-gray-500">Check class schedules and events</p>
              </div>
            </div>
            <button className="mt-4 w-full border border-indigo-500 text-indigo-500 rounded-md py-2 hover:bg-indigo-50">
              View Calendar
            </button>
          </div>

          <div className="bg-white shadow rounded-xl p-6 min-h-[300px]">
            <div className="flex items-center gap-4">
              <User className="h-6 w-6 text-indigo-500" />
              <div>
                <h3 className="font-semibold text-lg">Profile Settings</h3>
                <p className="text-sm text-gray-500">Manage personal information</p>
              </div>
            </div>
            <button className="mt-4 w-full border border-indigo-500 text-indigo-500 rounded-md py-2 hover:bg-indigo-50">
              Edit Profile
            </button>
          </div>

          <div className="bg-white shadow rounded-xl p-6 min-h-[300px]">
            <div className="flex items-center gap-4">
              <FileText className="h-6 w-6 text-indigo-500" />
              <div>
                <h3 className="font-semibold text-lg">Grades</h3>
                <p className="text-sm text-gray-500">Review current and past grades</p>
              </div>
            </div>
            <button className="mt-4 w-full border border-indigo-500 text-indigo-500 rounded-md py-2 hover:bg-indigo-50">
              Check Grades
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
