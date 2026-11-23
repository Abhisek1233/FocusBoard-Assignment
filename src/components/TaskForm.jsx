import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';

export default function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  initialTask = null
}) {
  const isEditMode = Boolean(initialTask && initialTask.id);

  // Form field states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Design');
  const [status, setStatus] = useState('To do');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const titleInputRef = useRef(null);

  // Populate or reset form when modal opens or initialTask changes
  useEffect(() => {
    if (isOpen) {
      if (initialTask) {
        setTitle(initialTask.title || '');
        setDescription(initialTask.description || '');
        setCategory(initialTask.category || 'Design');
        setStatus(initialTask.status || 'To do');
        setPriority(initialTask.priority || 'Medium');
        setDueDate(initialTask.dueDate || new Date().toISOString().split('T')[0]);
      } else {
        setTitle('');
        setDescription('');
        setCategory('Design');
        setStatus('To do');
        setPriority('Medium');
        // Default due date to today
        setDueDate(new Date().toISOString().split('T')[0]);
      }
      setError('');
      // Auto-focus title input
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, initialTask]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Please provide a task title.');
      titleInputRef.current?.focus();
      return;
    }

    const taskPayload = {
      ...(initialTask?.id ? { id: initialTask.id } : {}),
      title: trimmedTitle,
      description: description.trim(),
      category,
      status,
      priority,
      dueDate: dueDate || new Date().toISOString().split('T')[0]
    };

    onSubmit(taskPayload);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-form-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 id="task-form-title" className="text-lg font-bold text-slate-900">
              {isEditMode ? 'Edit task' : 'Create new task'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditMode
                ? 'Update your task details and progress below.'
                : 'Add your task details to stay on top of your work.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close task form modal"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Error Message Alert */}
          {error && (
            <div
              role="alert"
              className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Title Field */}
          <div>
            <label htmlFor="form-title" className="block text-xs font-semibold text-slate-700 mb-1">
              Task title <span className="text-red-500">*</span>
            </label>
            <input
              ref={titleInputRef}
              id="form-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Update pricing page"
              className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                error ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'
              }`}
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="form-description" className="block text-xs font-semibold text-slate-700 mb-1">
              Description <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="form-description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes, acceptance criteria, or context..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all resize-none"
            />
          </div>

          {/* Status & Priority Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="form-status" className="block text-xs font-semibold text-slate-700 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="form-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer"
              >
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label htmlFor="form-priority" className="block text-xs font-semibold text-slate-700 mb-1">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                id="form-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Category & Due Date Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="form-category" className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <select
                id="form-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer"
              >
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Content">Content</option>
                <option value="Research">Research</option>
                <option value="Testing">Testing</option>
              </select>
            </div>

            <div>
              <label htmlFor="form-dueDate" className="block text-xs font-semibold text-slate-700 mb-1">
                Due date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="form-dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-1">
            * Required field
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isEditMode ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
