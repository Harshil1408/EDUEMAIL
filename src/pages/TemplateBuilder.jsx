import React, { useState } from 'react';
import { 
  Layout, 
  Type, 
  Table as TableIcon, 
  Image as ImageIcon, 
  PanelBottom, 
  Save, 
  Plus, 
  Trash2,
  Move,
  Settings
} from 'lucide-react';
import './TemplateBuilder.css';

const TemplateBuilder = () => {
  const [blocks, setBlocks] = useState([
    { id: 1, type: 'header', content: 'Tuition Center Report' },
    { id: 2, type: 'student_info', content: 'Student Details Block' },
    { id: 3, type: 'text', content: 'Dear Parent, your child is doing great!' },
    { id: 4, type: 'table', content: 'Attendance & Marks Table' },
    { id: 5, type: 'footer', content: 'Best Regards, Admin' },
  ]);

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: `New ${type} block content`
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  return (
    <div className="template-builder-page fade-in">
      <div className="page-header">
        <div>
          <h1>Template Builder</h1>
          <p>Design beautiful email templates for student reports.</p>
        </div>
        <button className="btn btn-primary">
          <Save size={18} />
          Save Template
        </button>
      </div>

      <div className="builder-layout">
        <aside className="builder-sidebar card">
          <h3>Blocks</h3>
          <p className="sidebar-hint">Drag or click to add</p>
          <div className="block-tools">
            <button className="tool-btn" onClick={() => addBlock('header')}>
              <Layout size={20} />
              <span>Header</span>
            </button>
            <button className="tool-btn" onClick={() => addBlock('text')}>
              <Type size={20} />
              <span>Text</span>
            </button>
            <button className="tool-btn" onClick={() => addBlock('table')}>
              <TableIcon size={20} />
              <span>Report Table</span>
            </button>
            <button className="tool-btn" onClick={() => addBlock('image')}>
              <ImageIcon size={20} />
              <span>Logo/Image</span>
            </button>
            <button className="tool-btn" onClick={() => addBlock('footer')}>
              <PanelBottom size={20} />
              <span>Footer</span>
            </button>
          </div>
        </aside>

        <main className="builder-canvas">
          <div className="email-canvas card">
            <div className="canvas-header">
              <div className="canvas-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="canvas-title">Untitled Template</div>
            </div>
            
            <div className="canvas-body">
              {blocks.map((block, index) => (
                <div key={block.id} className="template-block-wrapper group">
                  <div className="block-actions">
                    <button className="action-btn"><Move size={14} /></button>
                    <button className="action-btn" onClick={() => removeBlock(block.id)}><Trash2 size={14} /></button>
                  </div>
                  
                  <div className={`template-block ${block.type}`}>
                    {block.type === 'header' && (
                      <div className="block-header-content">
                        <h2>{block.content}</h2>
                      </div>
                    )}
                    {block.type === 'student_info' && (
                      <div className="block-student-info">
                        <div className="info-row"><strong>Name:</strong> Alex Doe</div>
                        <div className="info-row"><strong>Class:</strong> Grade 10</div>
                      </div>
                    )}
                    {block.type === 'text' && (
                      <p contentEditable>{block.content}</p>
                    )}
                    {block.type === 'table' && (
                      <table className="preview-table">
                        <thead>
                          <tr><th>Subject</th><th>Marks</th><th>Status</th></tr>
                        </thead>
                        <tbody>
                          <tr><td>Math</td><td>85/100</td><td>Passed</td></tr>
                          <tr><td>Science</td><td>92/100</td><td>Passed</td></tr>
                        </tbody>
                      </table>
                    )}
                    {block.type === 'footer' && (
                      <div className="block-footer-content">
                        <p>{block.content}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <button className="add-block-placeholder" onClick={() => addBlock('text')}>
                <Plus size={20} />
                <span>Add new block</span>
              </button>
            </div>
          </div>
        </main>

        <aside className="builder-settings card">
          <h3>Settings</h3>
          <div className="settings-group">
            <label>Template Name</label>
            <input type="text" defaultValue="Student Progress Report" />
          </div>
          <div className="settings-group">
            <label>Theme Color</label>
            <div className="color-picker">
              <div className="color-option active" style={{background: '#2563eb'}}></div>
              <div className="color-option" style={{background: '#10b981'}}></div>
              <div className="color-option" style={{background: '#8b5cf6'}}></div>
              <div className="color-option" style={{background: '#f59e0b'}}></div>
            </div>
          </div>
          <div className="settings-group">
            <label>Font Style</label>
            <select>
              <option>Sans Serif (Inter)</option>
              <option>Serif (Roboto)</option>
              <option>Monospace</option>
            </select>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TemplateBuilder;
