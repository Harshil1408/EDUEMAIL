import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit2, 
  Send,
  X,
  ChevronDown
} from 'lucide-react';
import { INITIAL_STUDENTS, CLASSES, SECTIONS } from '../utils/data';
import './Students.css';

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState(INITIAL_STUDENTS);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.includes(searchTerm);
    
    const matchesClass = selectedClass === 'All' || student.class === selectedClass;
    const matchesSection = selectedSection === 'All' || student.section === selectedSection;
    
    return matchesSearch && matchesClass && matchesSection;
  });

  return (
    <div className="students-page fade-in">
      <div className="page-header">
        <div>
          <h1>Student Management</h1>
          <p>Organize students by class and section for better tracking.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Add Student
        </button>
      </div>

      <div className="table-actions-container card">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by name, roll no, or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters-group">
          <div className="filter-dropdown">
            <label>Class</label>
            <div className="select-wrapper">
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                <option value="All">All Classes</option>
                {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>
          </div>
          
          <div className="filter-dropdown">
            <label>Section</label>
            <div className="select-wrapper">
              <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
                <option value="All">All Sections</option>
                {SECTIONS.map(s => <option key={s} value={s}>Section {s}</option>)}
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>
          </div>
        </div>
      </div>

      <div className="card table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Class & Section</th>
              <th>Attendance %</th>
              <th>Last Score</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? filteredStudents.map(student => (
              <tr key={student.id}>
                <td className="font-mono text-xs font-bold text-muted">#{student.rollNo}</td>
                <td>
                  <div className="student-info">
                    <div className="student-avatar">{student.name.charAt(0)}</div>
                    <div>
                      <span className="font-medium block">{student.name}</span>
                      <span className="text-xs text-muted">{student.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="class-badge">
                    {student.class} • Section {student.section}
                  </div>
                </td>
                <td>
                  <div className="progress-mini">
                    <div className="progress-bar" style={{ width: `${student.attendance}%` }}></div>
                    <span>{student.attendance}%</span>
                  </div>
                </td>
                <td>{student.lastScore}/100</td>
                <td>
                  <span className={`badge badge-${
                    student.lastScore >= 80 ? 'success' : 
                    student.lastScore >= 50 ? 'warning' : 'danger'
                  }`}>
                    {student.lastScore >= 80 ? 'High' : student.lastScore >= 50 ? 'Medium' : 'Low'}
                  </span>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn" title="View"><Eye size={16} /></button>
                    <button className="icon-btn" title="Edit"><Edit2 size={16} /></button>
                    <button className="icon-btn" title="Send Report"><Send size={16} /></button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="text-center py-8 text-muted">
                  No students found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content fade-in">
            <div className="modal-header">
              <h3>Add New Student</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form className="modal-form" onSubmit={(e) => {
              e.preventDefault();
              setShowModal(false);
            }}>
              <div className="form-row">
                <div className="form-group">
                  <label>Student Name</label>
                  <input type="text" placeholder="Enter full name" required />
                </div>
                <div className="form-group">
                  <label>Roll Number</label>
                  <input type="text" placeholder="e.g. 101" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Class</label>
                  <select required>
                    <option value="">Select Class</option>
                    {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Section</label>
                  <select required>
                    <option value="">Select Section</option>
                    {SECTIONS.map(s => <option key={s} value={s}>Section {s}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Parent Email</label>
                <input type="email" placeholder="parent@example.com" required />
              </div>
              <div className="form-footer">
                <button type="button" className="btn btn-secondary-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Student</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
