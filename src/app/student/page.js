// Example for src/app/student-dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Assuming you'll add a logout link

export default function StudentDashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState(null); // State to store user info

    useEffect(() => {
        // Run this effect only once on component mount
        const storedUser = localStorage.getItem('currentUser');
        if (!storedUser) {
            router.push('/login'); // Redirect if no user found
            return;
        }

        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role !== 'student') {
            router.push('/login'); // Redirect if not a student
            return;
        }
        setUser(parsedUser); // Set user state

    }, [router]); // Dependency array: re-run if router changes (rarely)

    const handleLogout = () => {
        localStorage.removeItem('currentUser'); // Clear stored user info
        router.push('/login'); // Redirect to login page
    };

    if (!user) {
        // Optionally show a loading state or nothing while redirecting
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Welcome, {user.firstName}!</h1>
            <p>This is your student dashboard.</p>
            {/* You'll display fees and payment history here */}

            <button onClick={handleLogout} style={{ marginTop: '30px', padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Logout
            </button>
        </div>
    );
}