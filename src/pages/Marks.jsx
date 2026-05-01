import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  BookOpen, 
  Save, 
  Search,
  CheckCircle2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import './Marks.css';

const Marks = () => {
  const [testDetails, setTestDetails] = useState({
    name: 'Unit Test 1',
    subject: 'Mathematics',
    date: '2026-05-01',
    maxMarks: 100
  });

  const [scores, setScores] = useState([
    { id: 1, name: 'Alex Doe', score: 85 },
    { id: 2, name: 'Emma Johnson', score: 94 },
    { id: 3, name: 'James Miller', score: 45 },
    { id: 4, name: 'Lily Evans', score: 72 },
    { id: 5, name: 'Oliver Twist', score: 88 },
    { id: 6, name: 'Sophia Wilson', score: 38 },
    { id: 7, name: 'William Smith', score: 65 },
  ]);

  const [saved, setSaved] = useState(false);

  const handleScoreChange = (id, value) => {
    const numValue = value === '' ? '' : parseInt(value);
    if (numValue !== '' && (numValue < 0 || numValue > testDetails.maxMarks)) return;
    
    setScores(prev => prev.map(s => 
      s.id === id ? { ...s, score: numValue } : s
    ));
    setSaved(false);
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return <span className="badge badge-success">High</span>;
    if (score >= 50) return <span className="badge badge-warning">Medium</span>;
    return <span className="badge badge-danger">Low</span>;
  };

  const averageScore = Math.round(scores.reduce((acc, curr) => acc + (curr.score || 0), 0) / scores.length);

  return (
    <div className="marks-page fade-in">
      <div className="page-header">
        <div>
          <h1>Marks Entry</h1>
          <p>Record student test scores and analyze performance.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setSaved(true)}>
          <Save size={18} />
          Save Scores
        </button>
      </div>

      {saved && (
        <div className="success-banner fade-in">
          <CheckCircle2 size={20} />
          <span>Scores saved successfully! Parent reports are ready to send.</span>
        </div>
      )}

      <div className="test-config card">
        <div className="config-grid">
          <div className="config-item">
            <label><FileText size={16} /> Test Name</label>
            <input 
              type="text" 
              value={testDetails.name}
              onChange={(e) => setTestDetails({...testDetails, name: e.target.value})}
            />
          </div>
          <div className="config-item">
            <label><BookOpen size={16} /> Subject</label>
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
            <label><Calendar size={16} /> Date</label>
            <input 
              type="date" 
              value={testDetails.date}
              onChange={(e) => setTestDetails({...testDetails, date: e.target.value})}
            />
          </div>
          <div className="config-item">
            <label>Max Marks</label>
            <input 
              type="number" 
              value={testDetails.maxMarks}
              onChange={(e) => setTestDetails({...testDetails, maxMarks: parseInt(e.target.value)})}
            />
          </div>
        </div>
        
        <div className="test-summary">
          <div className="summary-stat">
            <TrendingUp size={20} className="text-primary" />
            <div>
              <span className="label">Class Average</span>
              <span className="value">{averageScore}%</span>
            </div>
          </div>
          <div className="summary-stat">
            <AlertCircle size={20} className="text-danger" />
            <div>
              <span className="label">Low Performers</span>
              <span className="value">{scores.filter(s => s.score < 50).length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card marks-table-container">
        <div className="table-header">
          <div className="search-mini">
            <Search size={16} />
            <input type="text" placeholder="Find student..." />
          </div>
          <div className="class-label">Grade 10 - Section A</div>
        </div>
        
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Marks Obtained</th>
              <th>Percentage</th>
              <th>Status</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {scores.map(student => (
              <tr key={student.id} className={student.score < 50 ? 'row-warning' : ''}>
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
                        backgroundColor: student.score >= 80 ? 'var(--secondary)' : student.score >= 50 ? 'var(--warning)' : 'var(--danger)'
                      }}></div>
                    </div>
                    <span>{Math.round((student.score / testDetails.maxMarks) * 100)}%</span>
                  </div>
                </td>
                <td>{getScoreBadge(student.score)}</td>
                <td>
                  <input type="text" className="feedback-input" placeholder="Add a comment..." />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Marks;
