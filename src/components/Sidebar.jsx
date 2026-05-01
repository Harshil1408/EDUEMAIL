import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  GraduationCap, 
  Mail, 
  FileEdit, 
  BarChart3, 
  Settings,
  LogOut
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Users size={20} />, label: 'Students', path: '/students' },
    { icon: <CalendarCheck size={20} />, label: 'Attendance', path: '/attendance' },
    { icon: <GraduationCap size={20} />, label: 'Marks', path: '/marks' },
    { icon: <Mail size={20} />, label: 'Email Reports', path: '/email-reports' },
    { icon: <FileEdit size={20} />, label: 'Templates', path: '/templates' },
    { icon: <BarChart3 size={20} />, label: 'Reports', path: '/reports' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-wrapper">
          <div className="logo-icon">🎓</div>
          <span className="logo-text">EduStream</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={() => window.location.href = '/'}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
