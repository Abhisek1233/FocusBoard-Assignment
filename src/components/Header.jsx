import React from 'react';
import { Menu, Bell, ChevronDown, Plus } from 'lucide-react';

export default function Header({ onOpenSidebar, onOpenCreateTask, activeNav = 'Overview' }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile Menu Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Brand Title */}
        <div className="flex lg:hidden items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            FB
          </div>
          <span className="font-bold text-slate-900 text-sm">FocusBoard</span>
        </div>

        {/* Desktop Breadcrumb */}
        <nav aria-label="Breadcrumb" className="hidden lg:flex items-center gap-2 text-sm">
          <span className="text-slate-500 hover:text-slate-700 transition-colors">Workspace</span>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-900">{activeNav}</span>
        </nav>
      </div>

      {/* Right Controls: Quick Add button, Notification, User Avatar */}
      <div className="flex items-center gap-3">
        {/* Mobile Quick Add Task button */}
        <button
          type="button"
          onClick={onOpenCreateTask}
          className="sm:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 active:scale-95 transition-all"
          aria-label="Add new task"
        >
          <Plus className="w-4 h-4" />
        </button>

        <button
          type="button"
          className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white"></span>
        </button>

        <div className="h-4 w-px bg-slate-200"></div>

        {/* User Avatar & Dropdown */}
        <div className="flex items-center gap-2 cursor-pointer select-none group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-bold flex items-center justify-center text-xs shadow-xs">
            JD
          </div>
          <div className="hidden md:block text-left">
            <span className="block text-xs font-semibold text-slate-900 leading-tight">John Doe</span>
            <span className="block text-[10px] text-slate-500 leading-tight">Admin</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
        </div>
      </div>
    </header>
  );
}
