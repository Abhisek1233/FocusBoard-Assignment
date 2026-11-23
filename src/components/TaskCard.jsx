import React from 'react';
import {
  Calendar,
  CheckCircle2,
  Circle,
  MoreVertical,
  Pencil,
  Trash2,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function TaskCard({
  task,
  onToggleStatus,
  onStatusChange,
  onEdit,
  onDelete
}) {
  const isCompleted = task.status === 'Completed';

  // Category badge styles
  const getCategoryBadgeClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'design':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/60';
      case 'development':
        return 'bg-blue-50 text-blue-700 border-blue-200/60';
      case 'content':
        return 'bg-purple-50 text-purple-700 border-purple-200/60';
      case 'research':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      case 'testing':
        return 'bg-teal-50 text-teal-700 border-teal-200/60';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200/60';
    }
  };

  // Priority badge styles
  const getPriorityBadgeClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-orange-50 text-orange-700 border-orange-200/80';
      case 'medium':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'low':
        return 'bg-slate-100 text-slate-600 border-slate-200/80';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200/60';
    }
  };

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const date = new Date(parts[0], parts[1] - 1, parts[2]);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 hover:shadow-md ${
        isCompleted
          ? 'border-slate-200/70 bg-slate-50/40 opacity-90'
          : 'border-slate-200 hover:border-indigo-200'
      }`}
    >
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        {/* Left: Checkbox & Task Information */}
        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
          {/* Quick status toggle button */}
          <button
            type="button"
            onClick={() => onToggleStatus(task)}
            aria-label={`Mark task "${task.title}" as ${isCompleted ? 'incomplete' : 'completed'}`}
            className="mt-0.5 shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
            ) : (
              <div className="w-5 h-5 rounded-md border-2 border-slate-300 group-hover:border-indigo-500 transition-colors flex items-center justify-center">
                {task.status === 'In progress' && (
                  <div className="w-2.5 h-2.5 rounded-xs bg-indigo-600" />
                )}
              </div>
            )}
          </button>

          {/* Title and Description */}
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className={`text-sm sm:text-base font-semibold text-slate-900 truncate ${
                  isCompleted ? 'line-through text-slate-400' : ''
                }`}
              >
                {task.title}
              </h3>
            </div>

            {task.description && (
              <p
                className={`text-xs text-slate-500 line-clamp-2 ${
                  isCompleted ? 'line-through text-slate-400' : ''
                }`}
              >
                {task.description}
              </p>
            )}

            {/* Badges & Meta Row */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap pt-2 text-xs">
              {/* Category Badge */}
              {task.category && (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getCategoryBadgeClass(
                    task.category
                  )}`}
                >
                  {task.category}
                </span>
              )}

              {/* Priority Badge */}
              {task.priority && (
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getPriorityBadgeClass(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              )}

              {/* Status Select dropdown */}
              <div className="relative inline-flex items-center">
                <label htmlFor={`status-select-${task.id}`} className="sr-only">
                  Change status for {task.title}
                </label>
                <select
                  id={`status-select-${task.id}`}
                  value={task.status}
                  onChange={(e) => onStatusChange(task.id, e.target.value)}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border appearance-none cursor-pointer pr-4 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    task.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : task.status === 'In progress'
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <option value="To do">To do</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <span className="absolute right-1 text-[8px] pointer-events-none text-slate-400">
                  ▼
                </span>
              </div>

              {/* Due Date */}
              {task.dueDate && (
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {formatDate(task.dueDate)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Actions: Edit & Delete buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => onEdit(task)}
            aria-label={`Edit task "${task.title}"`}
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title="Edit task"
          >
            <Pencil className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(task)}
            aria-label={`Delete task "${task.title}"`}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
