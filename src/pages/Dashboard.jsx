import React from 'react';
import { 
  Users, 
  CalendarCheck, 
  Clock, 
  Send,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import './Dashboard.css';

const StatCard = ({ title, value, icon, trend, trendValue, color }) => (
  <div className="card stat-card">
    <div className="stat-card-header">
      <div className={`icon-box ${color}`}>
        {icon}
      </div>
      {trend && (
        <div className={`trend ${trend}`}>
          {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span>{trendValue}</span>
        </div>
      )}
    </div>
    <div className="stat-card-content">
      <p className="stat-title">{title}</p>
      <h3 className="stat-value">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const attendanceData = [
    { name: 'Mon', attendance: 85 },
    { name: 'Tue', attendance: 92 },
    { name: 'Wed', attendance: 88 },
    { name: 'Thu', attendance: 95 },
    { name: 'Fri', attendance: 90 },
    { name: 'Sat', attendance: 75 },
    { name: 'Sun', attendance: 82 },
  ];

  const performanceData = [
    { name: 'Mathematics', score: 85, color: '#2563eb' },
    { name: 'Physics', score: 72, color: '#10b981' },
    { name: 'Chemistry', score: 68, color: '#f59e0b' },
    { name: 'Biology', score: 91, color: '#3b82f6' },
    { name: 'English', score: 88, color: '#8b5cf6' },
  ];

  const recentEmails = [
    { id: 1, parent: 'John Doe', student: 'Alex Doe', type: 'Weekly Report', status: 'Delivered', date: '2 hours ago' },
    { id: 2, parent: 'Sarah Smith', student: 'Leo Smith', type: 'Attendance Alert', status: 'Opened', date: '5 hours ago' },
    { id: 3, parent: 'Mike Johnson', student: 'Emma Johnson', type: 'Test Result', status: 'Sent', date: 'Yesterday' },
    { id: 4, parent: 'Emily Brown', student: 'Noah Brown', type: 'Monthly Review', status: 'Delivered', date: '2 days ago' },
  ];

  return (
    <div className="dashboard-page fade-in">
      <div className="page-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Welcome back! Here's what's happening today.</p>
        </div>
        <div className="date-display">
          <CalendarCheck size={18} />
          <span>May 01, 2026</span>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard 
          title="Total Students" 
          value="128" 
          icon={<Users size={24} />} 
          trend="up" 
          trendValue="+12%" 
          color="blue"
        />
        <StatCard 
          title="Today's Attendance" 
          value="94%" 
          icon={<CalendarCheck size={24} />} 
          trend="up" 
          trendValue="+3%" 
          color="green"
        />
        <StatCard 
          title="Pending Reports" 
          value="12" 
          icon={<Clock size={24} />} 
          trend="down" 
          trendValue="-5" 
          color="yellow"
        />
        <StatCard 
          title="Emails Sent" 
          value="1,420" 
          icon={<Send size={24} />} 
          trend="up" 
          trendValue="+240" 
          color="purple"
        />
      </div>

      <div className="charts-grid">
        <div className="card chart-container">
          <div className="chart-header">
            <h3>Attendance Trends</h3>
            <p>Average daily attendance over the last 7 days</p>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="#2563eb" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorAttendance)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card chart-container">
          <div className="chart-header">
            <h3>Student Performance</h3>
            <p>Average test scores by subject</p>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={40}>
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card recent-activity">
        <div className="activity-header">
          <h3>Recent Email Communication</h3>
          <button className="btn-text">View All</button>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Parent Name</th>
                <th>Student</th>
                <th>Report Type</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentEmails.map(email => (
                <tr key={email.id}>
                  <td className="font-medium">{email.parent}</td>
                  <td>{email.student}</td>
                  <td>{email.type}</td>
                  <td>
                    <span className={`badge badge-${
                      email.status === 'Delivered' ? 'success' : 
                      email.status === 'Opened' ? 'info' : 'warning'
                    }`}>
                      {email.status}
                    </span>
                  </td>
                  <td className="text-muted">{email.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
