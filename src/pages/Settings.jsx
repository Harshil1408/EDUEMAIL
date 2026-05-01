import React, { useState } from 'react';
import { 
  Building, 
  Mail, 
  User, 
  Bell, 
  Shield, 
  Globe,
  Save,
  ChevronRight
} from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('institute');

  const tabs = [
    { id: 'institute', icon: <Building size={18} />, label: 'Institute Details' },
    { id: 'email', icon: <Mail size={18} />, label: 'Email Configuration' },
    { id: 'profile', icon: <User size={18} />, label: 'Admin Profile' },
    { id: 'notifications', icon: <Bell size={18} />, label: 'Notifications' },
  ];

  return (
    <div className="settings-page fade-in">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Configure your tuition management system preferences.</p>
        </div>
        <button className="btn btn-primary">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="settings-layout">
        <div className="settings-tabs card">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={`tab-link ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <ChevronRight size={16} className="chevron" />
            </button>
          ))}
        </div>

        <div className="settings-content card">
          {activeTab === 'institute' && (
            <div className="settings-pane fade-in">
              <h3>Institute Details</h3>
              <div className="form-grid">
                <div className="form-group full">
                  <label>Institute Name</label>
                  <input type="text" defaultValue="EduStream Academy" />
                </div>
                <div className="form-group">
                  <label>Contact Email</label>
                  <input type="email" defaultValue="contact@edustream.com" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="form-group full">
                  <label>Address</label>
                  <textarea rows={3} defaultValue="123 Education Lane, Learning City, ED 54321"></textarea>
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input type="url" defaultValue="https://edustream-academy.com" />
                </div>
                <div className="form-group">
                  <label>Timezone</label>
                  <select>
                    <option>GMT (London)</option>
                    <option selected>IST (New Delhi)</option>
                    <option>EST (New York)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="settings-pane fade-in">
              <h3>SMTP Configuration</h3>
              <p className="pane-desc">Setup your SMTP server to send reports to parents.</p>
              <div className="form-grid">
                <div className="form-group">
                  <label>SMTP Host</label>
                  <input type="text" placeholder="smtp.gmail.com" />
                </div>
                <div className="form-group">
                  <label>Port</label>
                  <input type="number" placeholder="587" />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" placeholder="your-email@gmail.com" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="••••••••••••" />
                </div>
                <div className="form-group">
                  <label>Encryption</label>
                  <select>
                    <option>None</option>
                    <option>SSL</option>
                    <option selected>TLS</option>
                  </select>
                </div>
                <div className="form-group full">
                  <button className="btn btn-secondary-outline">Test Connection</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="settings-pane fade-in">
              <h3>Admin Profile</h3>
              <div className="profile-upload">
                <div className="avatar-large">AD</div>
                <button className="btn btn-text">Change Photo</button>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" defaultValue="Admin" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" defaultValue="User" />
                </div>
                <div className="form-group full">
                  <label>Email Address</label>
                  <input type="email" defaultValue="admin@edustream.com" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-pane fade-in">
              <h3>Notification Settings</h3>
              <div className="notification-list">
                <div className="notification-item">
                  <div className="noti-info">
                    <span className="noti-title">Daily Attendance Report</span>
                    <span className="noti-desc">Send automated email to parents when student is absent.</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="noti-info">
                    <span className="noti-title">Test Result Alerts</span>
                    <span className="noti-desc">Send email notification as soon as marks are saved.</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="noti-info">
                    <span className="noti-title">Monthly Summary</span>
                    <span className="noti-desc">Generate and send monthly progress reports automatically.</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
