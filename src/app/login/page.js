'use client'; // This directive makes it a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for App Router navigation
import Link from 'next/link';
import { Users } from '../../data/mockdata'; // Adjust path if needed
import styles from './page.module.css'

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
                router.push('/admin-dashboard');
            } else {
                router.push('/'); // Fallback
            }

        } else {
            setError('Invalid email or password.');
        }
    };
  return (
    
    <div className={styles.card}>
        <div className={styles.logo}>
            <i className="fas fa-graduation-cap logo-icon"></i> Ifeoluwa Group Of Schools
        </div>

        <form  onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}

          <div className={styles.input}>
            <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder='Enter email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} required
            />
          </div>
          <div className={styles.input}>
            <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder='Password'
                value={password} 
                onChange={(e) => setPassword(e.target.value)} required
            />
          </div>

          <button className={styles.loginButton} type="submit">Log in</button>
        </form>
      <p className={styles.text}>Don't have an account? <Link href="./student">Register</Link></p>
    </div>
  );
}