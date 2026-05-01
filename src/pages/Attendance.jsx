import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Calendar, 
  Filter, 
  Save, 
  CheckCircle2,
  Users
} from 'lucide-react';
import './Attendance.css';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState('2026-05-01');
  const [selectedClass, setSelectedClass] = useState('Grade 10');
  const [attendance, setAttendance] = useState([
    { id: 1, name: 'Alex Doe', status: 'present' },
    { id: 2, name: 'Emma Johnson', status: 'present' },
    { id: 3, name: 'James Miller', status: 'absent' },
    { id: 4, name: 'Lily Evans', status: 'present' },
    { id: 5, name: 'Oliver Twist', status: 'present' },
    { id: 6, name: 'Sophia Wilson', status: 'absent' },
    { id: 7, name: 'William Smith', status: 'present' },
  ]);
  const [saved, setSaved] = useState(false);

  const toggleStatus = (id) => {
    setAttendance(prev => prev.map(student => 
      student.id === id 
        ? { ...student, status: student.status === 'present' ? 'absent' : 'present' }
        : student
    ));
    setSaved(false);
  };

  const markAllPresent = () => {
    setAttendance(prev => prev.map(student => ({ ...student, status: 'present' })));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="attendance-page fade-in">
      <div className="page-header">
        <div>
          <h1>Attendance Marking</h1>
          <p>Mark daily attendance for students and notify parents.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary-outline" onClick={markAllPresent}>
            <CheckCircle2 size={18} />
            Mark All Present
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={18} />
            Save Attendance
          </button>
        </div>
      </div>

      {saved && (
        <div className="success-banner fade-in">
          <CheckCircle2 size={20} />
          <span>Attendance saved successfully and reports generated!</span>
        </div>
      )}

      <div className="filters-card card">
        <div className="filter-item">
          <label><Calendar size={16} /> Date</label>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label><Filter size={16} /> Class</label>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option>Grade 8</option>
            <option>Grade 9</option>
            <option>Grade 10</option>
          </select>
        </div>
        <div className="filter-stats">
          <div className="stat">
            <span className="label">Total Students</span>
            <span className="value">{attendance.length}</span>
          </div>
          <div className="stat">
            <span className="label">Present</span>
            <span className="value text-success">{attendance.filter(s => s.status === 'present').length}</span>
          </div>
          <div className="stat">
            <span className="label">Absent</span>
            <span className="value text-danger">{attendance.filter(s => s.status === 'absent').length}</span>
          </div>
        </div>
      </div>

      <div className="card attendance-list">
        <div className="list-header">
          <div className="col-name">Student Name</div>
          <div className="col-status">Status</div>
        </div>
        <div className="list-body">
          {attendance.map(student => (
            <div key={student.id} className="attendance-row">
              <div className="student-info">
                <div className="student-avatar">{student.name.charAt(0)}</div>
                <span className="font-medium">{student.name}</span>
              </div>
              <div className="status-toggle">
                <button 
                  className={`status-btn present ${student.status === 'present' ? 'active' : ''}`}
                  onClick={() => student.status !== 'present' && toggleStatus(student.id)}
                >
                  <Check size={16} />
                  Present
                </button>
                <button 
                  className={`status-btn absent ${student.status === 'absent' ? 'active' : ''}`}
                  onClick={() => student.status !== 'absent' && toggleStatus(student.id)}
                >
                  <X size={16} />
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
