import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Clock, 
  Users, 
  Eye, 
  CheckCircle2, 
  Mail,
  ChevronDown,
  Info,
  Calendar,
  Search
} from 'lucide-react';
import { INITIAL_STUDENTS, CLASSES, SECTIONS } from '../utils/data';
import './EmailReports.css';

const EmailReports = () => {
  const [selectedClass, setSelectedClass] = useState(CLASSES[0]);
  const [selectedSection, setSelectedSection] = useState(SECTIONS[0]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [reportType, setReportType] = useState('Monthly Progress');
  const [subject, setSubject] = useState('Monthly Performance Report - {{student_name}}');
  const [message, setMessage] = useState('Dear Parent,\n\nPlease find the monthly performance report for {{student_name}}.\n\nAttendance: {{attendance}}%\nLast Test Score: {{marks}}%\n\nRegards,\nEduStream Admin');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const students = INITIAL_STUDENTS.filter(s => s.class === selectedClass && s.section === selectedSection);

  useEffect(() => {
    setSelectedStudents([]);
  }, [selectedClass, selectedSection]);

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }, 2000);
  };

  const getPreviewMessage = (student) => {
    if (!student) return message;
    return message
      .replace('{{student_name}}', student.name)
      .replace('{{attendance}}', student.attendance)
      .replace('{{marks}}', student.lastScore);
  };

  const getPreviewSubject = (student) => {
    if (!student) return subject;
    return subject.replace('{{student_name}}', student.name);
  };

  return (
    <div className="email-reports-page fade-in">
      <div className="page-header">
        <div>
          <h1>Email Reports</h1>
          <p>Send personalized reports to parents by class and section.</p>
        </div>
      </div>

      <div className="reports-layout">
        <div className="reports-config">
          <div className="card config-section">
            <h3>1. Select Recipients</h3>
            <div className="class-section-selector">
              <div className="filter-group-mini">
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                  {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
                  {SECTIONS.map(s => <option key={s} value={s}>Section {s}</option>)}
                </select>
              </div>
            </div>
            
            <div className="student-selector">
              <div className="selector-header">
                <div className="search-mini">
                  <Search size={14} />
                  <input type="text" placeholder="Search students..." />
                </div>
                <button 
                  className="btn-text"
                  onClick={() => {
                    if (selectedStudents.length === students.length) setSelectedStudents([]);
                    else setSelectedStudents(students.map(s => s.id));
                  }}
                >
                  {selectedStudents.length === students.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
              <div className="student-list-mini">
                {students.map(s => (
                  <label key={s.id} className={`student-item ${selectedStudents.includes(s.id) ? 'selected' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={selectedStudents.includes(s.id)}
                      onChange={() => {
                        if (selectedStudents.includes(s.id)) {
                          setSelectedStudents(selectedStudents.filter(id => id !== s.id));
                        } else {
                          setSelectedStudents([...selectedStudents, s.id]);
                        }
                      }}
                    />
                    <div className="student-avatar-mini">{s.name.charAt(0)}</div>
                    <div className="student-details-mini">
                      <span className="name">{s.name}</span>
                      <span className="info">Roll: {s.rollNo}</span>
                    </div>
                  </label>
                ))}
                {students.length === 0 && <p className="p-4 text-center text-muted">No students found.</p>}
              </div>
            </div>
          </div>

          <div className="card config-section">
            <h3>2. Report Content</h3>
            <div className="form-group">
              <label>Report Template</label>
              <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                <option>Monthly Progress</option>
                <option>Weekly Attendance</option>
                <option>Test Results</option>
                <option>Custom Message</option>
              </select>
            </div>
            <div className="form-group">
              <label>Subject Line</label>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Message Body</label>
              <textarea 
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <div className="placeholders-hint">
                <Info size={14} />
                <span>Placeholders: <code>{"{{student_name}}"}</code>, <code>{"{{attendance}}"}</code>, <code>{"{{marks}}"}</code></span>
              </div>
            </div>
          </div>
        </div>

        <div className="reports-preview">
          <div className="card preview-card">
            <div className="preview-header">
              <h3>Email Preview</h3>
            </div>
            
            <div className="email-preview-container">
              {selectedStudents.length > 0 ? (
                <div className="email-mockup">
                  <div className="email-meta">
                    <div className="meta-row">
                      <span className="label">To:</span>
                      <span className="value">Parent of {students.find(s => s.id === selectedStudents[0])?.name}</span>
                    </div>
                    <div className="meta-row">
                      <span className="label">Subject:</span>
                      <span className="value font-bold">{getPreviewSubject(students.find(s => s.id === selectedStudents[0]))}</span>
                    </div>
                  </div>
                  
                  <div className="email-body-content">
                    <div className="edu-logo">🎓 EduStream</div>
                    <div className="report-badge">{reportType.toUpperCase()}</div>
                    <div className="message-text">
                      {getPreviewMessage(students.find(s => s.id === selectedStudents[0])).split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                    <div className="report-footer">
                      © 2026 EduStream Tuition Center.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-selection">
                  <Eye size={48} />
                  <p>Select a student to see the preview</p>
                </div>
              )}
            </div>

            <div className="preview-actions">
              <button 
                className={`btn btn-primary send-btn ${sending ? 'loading' : ''}`}
                disabled={selectedStudents.length === 0 || sending}
                onClick={handleSend}
              >
                {sending ? 'Sending...' : (
                  <>
                    <Send size={18} />
                    Send to {selectedStudents.length} Parents
                  </>
                )}
              </button>
            </div>
          </div>
          
          {sent && (
            <div className="sent-success-modal fade-in">
              <CheckCircle2 size={48} className="text-success" />
              <h3>Reports Sent!</h3>
              <p>Email reports have been queued for {selectedStudents.length} students.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailReports;
