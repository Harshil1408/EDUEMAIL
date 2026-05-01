import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Download, 
  Calendar, 
  Filter, 
  TrendingUp,
  UserCheck,
  Mail
} from 'lucide-react';
import './Reports.css';

const Reports = () => {
  const performanceData = [
    { month: 'Jan', average: 72 },
    { month: 'Feb', average: 75 },
    { month: 'Mar', average: 82 },
    { month: 'Apr', average: 78 },
    { month: 'May', average: 85 },
  ];

  const deliveryData = [
    { name: 'Delivered', value: 850, color: '#10b981' },
    { name: 'Opened', value: 420, color: '#3b82f6' },
    { name: 'Bounced', value: 30, color: '#ef4444' },
  ];

  return (
    <div className="reports-page fade-in">
      <div className="page-header">
        <div>
          <h1>Analytics & Reports</h1>
          <p>Detailed insights into student performance and communication metrics.</p>
        </div>
        <button className="btn btn-secondary-outline">
          <Download size={18} />
          Export Data
        </button>
      </div>

      <div className="reports-grid">
        <div className="card chart-large">
          <div className="chart-header">
            <h3>Academic Performance Trend</h3>
            <div className="chart-filters">
              <select><option>Grade 10</option></select>
              <select><option>All Subjects</option></select>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} dy={10} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="average" stroke="#2563eb" strokeWidth={3} dot={{ r: 6, fill: '#2563eb' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card chart-small">
          <div className="chart-header">
            <h3>Email Delivery Status</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deliveryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deliveryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {deliveryData.map(item => (
                <div key={item.name} className="legend-item">
                  <span className="dot" style={{background: item.color}}></span>
                  <span className="label">{item.name}</span>
                  <span className="value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="stats-row">
        <div className="card mini-stat">
          <div className="icon-circle blue"><TrendingUp size={20} /></div>
          <div>
            <span className="label">Avg. Class Score</span>
            <span className="value">78.5%</span>
          </div>
        </div>
        <div className="card mini-stat">
          <div className="icon-circle green"><UserCheck size={20} /></div>
          <div>
            <span className="label">Overall Attendance</span>
            <span className="value">91.2%</span>
          </div>
        </div>
        <div className="card mini-stat">
          <div className="icon-circle purple"><Mail size={20} /></div>
          <div>
            <span className="label">Emails Sent (MTD)</span>
            <span className="value">1,245</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
