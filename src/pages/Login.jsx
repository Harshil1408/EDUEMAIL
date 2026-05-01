import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    window.location.href = '/dashboard';
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="branding-content">
          <div className="logo-wrapper">
            <div className="logo-icon">🎓</div>
            <span className="logo-text">EduStream</span>
          </div>
          <div className="illustration-wrapper">
            {/* The generated image will be used here */}
            <img 
              src="/login_illustration.png" 
              alt="Tuition Management" 
              className="login-img"
            />
          </div>
          <div className="tagline-section">
            <h1>Smart Student Communication System</h1>
            <p>Empowering educators with seamless reporting and automated parent communication.</p>
          </div>
        </div>
        <div className="gradient-blob"></div>
      </div>
      
      <div className="login-right">
        <div className="login-form-wrapper fade-in">
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Login to manage your tuition center</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  id="email" 
                  placeholder="admin@edustream.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
            
            <button type="submit" className="btn btn-primary login-btn">
              Login to Dashboard
              <ArrowRight size={18} />
            </button>
          </form>
          
          <div className="form-footer">
            <p>Don't have an account? <a href="#">Contact Support</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
