import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, placeholder = 'Find a task...' }) {
  return (
    <div className="relative flex-1 min-w-[200px]">
      <label htmlFor="task-search-input" className="sr-only">
        Search tasks by title
      </label>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        id="task-search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 shadow-xs transition-all"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search query"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
