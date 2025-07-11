import React from 'react';
import Link from 'next/link';

const Navbar = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onNavClick
}) => (
    <header className="header">
        <div className="container">
          <div className="logo">
            <i className="fas fa-graduation-cap logo-icon"></i> Ifeoluwa Group Of Schools
          </div>
          <nav>
            <ul className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
              <li><a href="#" onClick={e => { e.preventDefault(); onNavClick && onNavClick('dashboard'); setIsMobileMenuOpen(false); }}>Home</a></li>
              <li><a href="#" onClick={e => { e.preventDefault(); onNavClick && onNavClick('new'); setIsMobileMenuOpen(false); }}>New Payment</a></li>
              <li><a href="#" onClick={e => { e.preventDefault(); onNavClick && onNavClick('print'); setIsMobileMenuOpen(false); }}>Print Payments</a></li>
            </ul>
            <div className={`menu-toggle${isMobileMenuOpen ? ' open' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </nav>
        </div>
      </header>
);

export default Navbar;