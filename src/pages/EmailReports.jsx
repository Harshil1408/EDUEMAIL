import React, { useState } from 'react';
import { 
  Send, 
  Clock, 
  Users, 
  Eye, 
  CheckCircle2, 
  Mail,
  ChevronRight,
  Info,
  Calendar
} from 'lucide-react';
import './EmailReports.css';

const EmailReports = () => {
  const [selectedStudents, setSelectedStudents] = useState([1, 2]);
  const [reportType, setReportType] = useState('Monthly Progress');
  const [subject, setSubject] = useState('Monthly Performance Report - {{student_name}}');
  const [message, setMessage] = useState('Dear Parent,\n\nPlease find the monthly performance report for {{student_name}}.\n\nAttendance: {{attendance}}%\nLast Test Score: {{marks}}%\n\nRegards,\nEduStream Admin');
  const [showPreview, setShowPreview] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const students = [
    { id: 1, name: 'Alex Doe', class: 'Grade 10', attendance: 92, marks: 85 },
    { id: 2, name: 'Emma Johnson', class: 'Grade 10', attendance: 95, marks: 94 },
    { id: 3, name: 'James Miller', class: 'Grade 10', attendance: 45, marks: 45 },
    { id: 4, name: 'Lily Evans', class: 'Grade 10', attendance: 72, marks: 72 },
  ];

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }, 2000);
  };

  const getPreviewMessage = (student) => {
    return message
      .replace('{{student_name}}', student.name)
      .replace('{{attendance}}', student.attendance)
      .replace('{{marks}}', student.marks);
  };

  const getPreviewSubject = (student) => {
    return subject.replace('{{student_name}}', student.name);
  };

  return (
    <div className="email-reports-page fade-in">
      <div className="page-header">
        <div>
          <h1>Email Reports</h1>
          <p>Send personalized reports to parents with a single click.</p>
        </div>
      </div>

      <div className="reports-layout">
        <div className="reports-config">
          <div className="card config-section">
            <h3>1. Select Recipients</h3>
            <div className="student-selector">
              <div className="selector-header">
                <div className="search-mini">
                  <Mail size={16} />
                  <input type="text" placeholder="Search students..." />
                </div>
                <button className="btn-text">Select All</button>
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
                      <span className="class">{s.class}</span>
                    </div>
                  </label>
                ))}
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
                rows={8}
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
              <div className="preview-tabs">
                <button className="tab active">Desktop</button>
                <button className="tab">Mobile</button>
              </div>
            </div>
            
            <div className="email-preview-container">
              {selectedStudents.length > 0 ? (
                <div className="email-mockup">
                  <div className="email-meta">
                    <div className="meta-row">
                      <span className="label">From:</span>
                      <span className="value">EduStream Admin &lt;reports@edustream.com&gt;</span>
                    </div>
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
                    <div className="report-badge">STUDENT PROGRESS REPORT</div>
                    <div className="message-text">
                      {getPreviewMessage(students.find(s => s.id === selectedStudents[0])).split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                    <div className="report-footer">
                      © 2026 EduStream Systems. All rights reserved.
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
              <div className="schedule-btn">
                <Clock size={18} />
                <span>Schedule for later</span>
              </div>
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
              <p>Email reports have been queued for delivery to {selectedStudents.length} parents.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailReports;
