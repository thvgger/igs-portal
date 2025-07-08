// src/app/student-dashboard/page.js
'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from './page.module.css';
import Dash from './dash';
import New from './new';
import Print from './print'

export default function StudentDashboardPage() {
    const [activeNav, setActiveNav] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeComponent, setActiveComponent] = useState('dashboard');

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveNav(id);
            setIsMobileMenuOpen(false);
        }
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'dashboard':
                return <Dash />;
            case 'new':
                return <New />;
            case 'print':
                return <Print />
            default:
                return <Dash />;
        }
    };

    return (
        <div className={styles.student}>
            <Navbar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                activeNav={activeNav}
                scrollToSection={scrollToSection}
                onNavClick={setActiveComponent}
            />
            <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                {renderComponent()}
            </div>
        </div>
    );
}