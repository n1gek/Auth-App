'use client'

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const verifyUserEmail = async () => {
        try {
            setLoading(true);
            setError(false);

            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        } else {
            setLoading(false);
            setError(true);
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-4">Verify Email</h1>

            {/* Display the token for debug clarity */}
            <p className="text-sm text-gray-500 break-all mb-4">
                Token: {token || "No token found"}
            </p>

            {loading && <p className="text-gray-600">Verifying your email, please wait...</p>}

            {verified && !loading && (
                <div className="text-green-600 text-center">
                    <h2 className="text-2xl font-semibold mb-2">Email Verified Successfully!</h2>
                    <Link href="/login" className="text-blue-500 underline">Go to Login</Link>
                </div>
            )}

            {error && !loading && (
                <div className="text-red-600 text-center">
                    <h2 className="text-2xl font-semibold mb-2">Error Verifying Your Account</h2>
                    <p>Please check your link or request a new verification email.</p>
                </div>
            )}
        </div>
    );
}
