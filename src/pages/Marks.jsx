import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Calendar, 
  BookOpen, 
  Save, 
  Search,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import { INITIAL_STUDENTS, CLASSES, SECTIONS } from '../utils/data';
import './Marks.css';

const Marks = () => {
  const [selectedClass, setSelectedClass] = useState(CLASSES[0]);
  const [selectedSection, setSelectedSection] = useState(SECTIONS[0]);
  const [testDetails, setTestDetails] = useState({
    name: 'Unit Test 1',
    subject: 'Mathematics',
    date: new Date().toISOString().split('T')[0],
    maxMarks: 100
  });

  const [scores, setScores] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const filtered = INITIAL_STUDENTS
      .filter(s => s.class === selectedClass && s.section === selectedSection)
      .map(s => ({ id: s.id, name: s.name, rollNo: s.rollNo, score: 0 }));
    setScores(filtered);
    setSaved(false);
  }, [selectedClass, selectedSection]);

  const handleScoreChange = (id, value) => {
    const numValue = value === '' ? '' : parseInt(value);
    if (numValue !== '' && (numValue < 0 || numValue > testDetails.maxMarks)) return;
    
    setScores(prev => prev.map(s => 
      s.id === id ? { ...s, score: numValue } : s
    ));
    setSaved(false);
  };

  const getScoreBadge = (score) => {
    if (score === '' || score === 0) return <span className="badge badge-info">Pending</span>;
    const percentage = (score / testDetails.maxMarks) * 100;
    if (percentage >= 80) return <span className="badge badge-success">High</span>;
    if (percentage >= 50) return <span className="badge badge-warning">Medium</span>;
    return <span className="badge badge-danger">Low</span>;
  };

  const averageScore = scores.length > 0 
    ? Math.round(scores.reduce((acc, curr) => acc + (Number(curr.score) || 0), 0) / scores.length) 
    : 0;

  return (
    <div className="marks-page fade-in">
      <div className="page-header">
        <div>
          <h1>Marks Entry</h1>
          <p>Record scores for {selectedClass} - {selectedSection}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setSaved(true)}>
          <Save size={18} />
          Save & Notify
        </button>
      </div>

      {saved && (
        <div className="success-banner fade-in">
          <CheckCircle2 size={20} />
          <span>Scores for {testDetails.name} have been recorded successfully.</span>
        </div>
      )}

      <div className="test-config card">
        <div className="config-row-main">
          <div className="config-item">
            <label>Class</label>
            <div className="select-wrapper">
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>
          </div>
          <div className="config-item">
            <label>Section</label>
            <div className="select-wrapper">
              <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
                {SECTIONS.map(s => <option key={s} value={s}>Section {s}</option>)}
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>
          </div>
          <div className="config-item">
            <label>Subject</label>
            <select 
              value={testDetails.subject}
              onChange={(e) => setTestDetails({...testDetails, subject: e.target.value})}
            >
              <option>Mathematics</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>English</option>
            </select>
          </div>
          <div className="config-item">
            <label>Test Name</label>
            <input 
              type="text" 
              value={testDetails.name}
              onChange={(e) => setTestDetails({...testDetails, name: e.target.value})}
            />
          </div>
        </div>
        
        <div className="test-summary">
          <div className="summary-stat">
            <TrendingUp size={20} className="text-primary" />
            <div>
              <span className="label">Avg. Score</span>
              <span className="value">{averageScore} / {testDetails.maxMarks}</span>
            </div>
          </div>
          <div className="summary-stat">
            <Calendar size={20} className="text-muted" />
            <div>
              <span className="label">Test Date</span>
              <input 
                type="date" 
                className="inline-date"
                value={testDetails.date}
                onChange={(e) => setTestDetails({...testDetails, date: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card marks-table-container">
        {scores.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Marks Obtained</th>
                <th>Percentage</th>
                <th>Status</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {scores.map(student => (
                <tr key={student.id}>
                  <td className="font-mono text-xs">#{student.rollNo}</td>
                  <td>
                    <div className="student-info">
                      <div className="student-avatar">{student.name.charAt(0)}</div>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="mark-input-wrapper">
                      <input 
                        type="number" 
                        className="mark-input"
                        value={student.score}
                        onChange={(e) => handleScoreChange(student.id, e.target.value)}
                      />
                      <span className="max-marks">/ {testDetails.maxMarks}</span>
                    </div>
                  </td>
                  <td>
                    <div className="percent-display">
                      <div className="percent-bar">
                        <div className="percent-fill" style={{ 
                          width: `${(student.score / testDetails.maxMarks) * 100}%`,
                          backgroundColor: student.score >= (testDetails.maxMarks * 0.8) ? 'var(--secondary)' : student.score >= (testDetails.maxMarks * 0.5) ? 'var(--warning)' : 'var(--danger)'
                        }}></div>
                      </div>
                      <span>{Math.round((student.score / testDetails.maxMarks) * 100)}%</span>
                    </div>
                  </td>
                  <td>{getScoreBadge(student.score)}</td>
                  <td>
                    <input type="text" className="feedback-input" placeholder="Good performance..." />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>No students found for marking in this class and section.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marks;
