'use client'; // This directive makes it a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for App Router navigation
import Link from 'next/link';
import { Users } from '../../data/mockdata'; // Adjust path if needed


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); // Initialize useRouter

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission and page reload
        setError(''); // Clear previous errors

        // Basic validation
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        // --- Simulate Backend Login ---
        const user = Users.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            // Simulate storing user info (e.g., in localStorage)
            // In a real app, you'd get a token from the backend
            localStorage.setItem('currentUser', JSON.stringify({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            }));

            alert(`Login successful! Welcome, ${user.firstName}.`); // Simple confirmation

            // Redirect based on role
            
            if (user.role === 'student') {
                router.push('/student');
            } else if (user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }

        } else {
            setError('Invalid email or password.');
        }
    };
  return (
    <div className="max-w-md mx-auto mt-36 p-5 rounded-lg bg-white shadow-lg border border-blue-100">
      <div className="text-2xl font-bold text-blue-700 flex items-center p-4 mb-2">
        <i className="fas fa-graduation-cap mr-2 text-blue-600"></i> Ifeoluwa Group Of Schools
      </div>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-600 text-sm mb-2 font-medium">{error}</p>}
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-slate-50 text-slate-700 rounded border border-blue-200 font-normal tracking-wide transition-colors duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-slate-50 text-slate-700 rounded border border-blue-200 font-normal tracking-wide transition-colors duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-700 text-white rounded font-semibold shadow-md tracking-wide transition-colors duration-200 text-lg border-none cursor-pointer hover:bg-blue-800 hover:-translate-y-0.5"
        >
          Log in
        </button>
      </form>
      <p className="text-center mt-4 text-slate-600">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-blue-500 hover:underline">Register</Link>
      </p>
    </div>
  );
}