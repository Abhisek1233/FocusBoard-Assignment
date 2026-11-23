import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export default function FilterTabs({
  activeStatus = 'All',
  onSelectStatus,
  selectedPriority = 'All',
  onSelectPriority,
  counts = { all: 0, todo: 0, inProgress: 0, completed: 0 },
  onResetFilters,
  isFiltered = false
}) {
  const tabs = [
    { id: 'All', label: 'All tasks', count: counts.all },
    { id: 'To do', label: 'To do', count: counts.todo },
    { id: 'In progress', label: 'In progress', count: counts.inProgress },
    { id: 'Completed', label: 'Completed', count: counts.completed }
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
      {/* Status Tabs matching Figma */}
      <div
        role="tablist"
        aria-label="Filter tasks by status"
        className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar"
      >
        {tabs.map((tab) => {
          const isActive = activeStatus === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectStatus(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Priority Dropdown & Reset Filters */}
      <div className="flex items-center gap-2 self-start sm:self-auto">
        <div className="relative flex items-center">
          <label htmlFor="priority-filter-select" className="sr-only">
            Filter by priority
          </label>
          <div className="absolute left-3 pointer-events-none text-slate-400">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <select
            id="priority-filter-select"
            value={selectedPriority}
            onChange={(e) => onSelectPriority(e.target.value)}
            className="pl-8 pr-8 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 shadow-xs cursor-pointer appearance-none"
          >
            <option value="All">Priority: All</option>
            <option value="High">Priority: High</option>
            <option value="Medium">Priority: Medium</option>
            <option value="Low">Priority: Low</option>
          </select>
          <div className="absolute right-2.5 pointer-events-none text-slate-400 text-xs">
            ▼
          </div>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
            title="Reset filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
