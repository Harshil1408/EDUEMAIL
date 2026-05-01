import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Attendance from './pages/Attendance';
import Marks from './pages/Marks';
import EmailReports from './pages/EmailReports';
import TemplateBuilder from './pages/TemplateBuilder';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        
        {/* Protected Routes (Simulated) */}
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/students" element={<DashboardLayout><Students /></DashboardLayout>} />
        <Route path="/attendance" element={<DashboardLayout><Attendance /></DashboardLayout>} />
        <Route path="/marks" element={<DashboardLayout><Marks /></DashboardLayout>} />
        <Route path="/email-reports" element={<DashboardLayout><EmailReports /></DashboardLayout>} />
        <Route path="/templates" element={<DashboardLayout><TemplateBuilder /></DashboardLayout>} />
        <Route path="/reports" element={<DashboardLayout><Reports /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
        
        {/* Redirect all other routes to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
