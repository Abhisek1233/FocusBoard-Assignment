import React from 'react';
import TaskCard from './TaskCard';
import { ClipboardList, Plus, RotateCcw } from 'lucide-react';

export default function TaskList({
  tasks = [],
  totalTasksCount = 0,
  onToggleStatus,
  onStatusChange,
  onEdit,
  onDelete,
  onOpenCreateTask,
  onResetFilters,
  isFiltered = false
}) {
  return (
    <div className="space-y-4">
      {/* Empty State */}
      {tasks.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <ClipboardList className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800">No tasks found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              {isFiltered
                ? "No tasks match your active search or filter criteria. Try adjusting or clearing your filters."
                : "You don't have any tasks in your list yet. Start by creating your first task!"}
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-3">
            {isFiltered ? (
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <RotateCcw className="w-4 h-4" />
                Reset filters
              </button>
            ) : null}
            <button
              type="button"
              onClick={onOpenCreateTask}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Plus className="w-4 h-4" />
              Add new task
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3" role="list" aria-label="Task list">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onStatusChange={onStatusChange}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
