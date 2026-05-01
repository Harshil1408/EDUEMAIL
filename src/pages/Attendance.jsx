import React, { useState, useEffect } from 'react';
import { 
  Check, 
  X, 
  Calendar, 
  Filter, 
  Save, 
  CheckCircle2,
  ChevronDown,
  Search
} from 'lucide-react';
import { INITIAL_STUDENTS, CLASSES, SECTIONS } from '../utils/data';
import './Attendance.css';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState(CLASSES[0]);
  const [selectedSection, setSelectedSection] = useState(SECTIONS[0]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [saved, setSaved] = useState(false);

  // Filter students based on class and section when selection changes
  useEffect(() => {
    const filtered = INITIAL_STUDENTS
      .filter(s => s.class === selectedClass && s.section === selectedSection)
      .map(s => ({ ...s, status: 'present' })); // Default to present
    setAttendanceList(filtered);
    setSaved(false);
  }, [selectedClass, selectedSection]);

  const toggleStatus = (id) => {
    setAttendanceList(prev => prev.map(student => 
      student.id === id 
        ? { ...student, status: student.status === 'present' ? 'absent' : 'present' }
        : student
    ));
    setSaved(false);
  };

  const markAllPresent = () => {
    setAttendanceList(prev => prev.map(student => ({ ...student, status: 'present' })));
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
          <p>Select class and section to start marking daily attendance.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary-outline" onClick={markAllPresent}>
            <CheckCircle2 size={18} />
            All Present
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={18} />
            Save & Notify
          </button>
        </div>
      </div>

      {saved && (
        <div className="success-banner fade-in">
          <CheckCircle2 size={20} />
          <span>Attendance for {selectedClass} - {selectedSection} has been saved and parents notified.</span>
        </div>
      )}

      <div className="filters-card card">
        <div className="filter-item">
          <label><Calendar size={14} /> Date</label>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        
        <div className="filter-item">
          <label>Class</label>
          <div className="select-wrapper">
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={14} className="select-arrow" />
          </div>
        </div>

        <div className="filter-item">
          <label>Section</label>
          <div className="select-wrapper">
            <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
              {SECTIONS.map(s => <option key={s} value={s}>Section {s}</option>)}
            </select>
            <ChevronDown size={14} className="select-arrow" />
          </div>
        </div>

        <div className="filter-stats">
          <div className="stat">
            <span className="label">Total</span>
            <span className="value">{attendanceList.length}</span>
          </div>
          <div className="stat">
            <span className="label">Present</span>
            <span className="value text-success">{attendanceList.filter(s => s.status === 'present').length}</span>
          </div>
          <div className="stat">
            <span className="label">Absent</span>
            <span className="value text-danger">{attendanceList.filter(s => s.status === 'absent').length}</span>
          </div>
        </div>
      </div>

      <div className="card attendance-list">
        {attendanceList.length > 0 ? (
          <>
            <div className="list-header">
              <div className="col-roll">Roll</div>
              <div className="col-name">Student Name</div>
              <div className="col-status">Status</div>
            </div>
            <div className="list-body">
              {attendanceList.map(student => (
                <div key={student.id} className="attendance-row">
                  <div className="col-roll font-mono">#{student.rollNo}</div>
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
          </>
        ) : (
          <div className="empty-state">
            <p>No students found in {selectedClass} - {selectedSection}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
