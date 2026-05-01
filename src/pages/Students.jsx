import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit2, 
  Send,
  X
} from 'lucide-react';
import './Students.css';

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const students = [
    { id: 1, name: 'Alex Doe', class: 'Grade 10', email: 'john@example.com', attendance: 92, lastScore: 85, status: 'High' },
    { id: 2, name: 'Leo Smith', class: 'Grade 9', email: 'sarah@example.com', attendance: 78, lastScore: 62, status: 'Medium' },
    { id: 3, name: 'Emma Johnson', class: 'Grade 10', email: 'mike@example.com', attendance: 95, lastScore: 94, status: 'High' },
    { id: 4, name: 'Noah Brown', class: 'Grade 8', email: 'emily@example.com', attendance: 65, lastScore: 45, status: 'Low' },
    { id: 5, name: 'Sophia Wilson', class: 'Grade 9', email: 'david@example.com', attendance: 88, lastScore: 78, status: 'Medium' },
    { id: 6, name: 'James Miller', class: 'Grade 10', email: 'lisa@example.com', attendance: 91, lastScore: 82, status: 'High' },
  ];

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="students-page fade-in">
      <div className="page-header">
        <div>
          <h1>Student Management</h1>
          <p>Manage and track your students' information</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Add Student
        </button>
      </div>

      <div className="table-actions">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by name or parent email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <button className="btn btn-secondary-outline">
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      <div className="card table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Class</th>
              <th>Parent Email</th>
              <th>Attendance %</th>
              <th>Last Test Score</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id}>
                <td>
                  <div className="student-info">
                    <div className="student-avatar">{student.name.charAt(0)}</div>
                    <span className="font-medium">{student.name}</span>
                  </div>
                </td>
                <td>{student.class}</td>
                <td className="text-muted">{student.email}</td>
                <td>
                  <div className="progress-mini">
                    <div className="progress-bar" style={{ width: `${student.attendance}%` }}></div>
                    <span>{student.attendance}%</span>
                  </div>
                </td>
                <td>{student.lastScore}/100</td>
                <td>
                  <span className={`badge badge-${
                    student.status === 'High' ? 'success' : 
                    student.status === 'Medium' ? 'warning' : 'danger'
                  }`}>
                    {student.status}
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
            ))}
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
            <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label>Student Name</label>
                  <input type="text" placeholder="Enter student name" required />
                </div>
                <div className="form-group">
                  <label>Class/Grade</label>
                  <select required>
                    <option value="">Select Class</option>
                    <option value="8">Grade 8</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Parent Email</label>
                <input type="email" placeholder="parent@example.com" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="form-footer">
                <button type="button" className="btn btn-secondary-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Student</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
