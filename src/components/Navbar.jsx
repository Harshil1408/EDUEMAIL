import React from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-search">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search students, reports, or settings..." />
      </div>
      
      <div className="navbar-actions">
        <button className="nav-icon-btn">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>
        
        <div className="user-profile">
          <div className="avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <span className="user-name">Admin User</span>
            <span className="user-role">Super Admin</span>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
