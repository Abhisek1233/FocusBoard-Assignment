import React from 'react';
import {
  LayoutGrid,
  CheckSquare,
  Calendar,
  Settings,
  X,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({
  isOpen,
  onClose,
  activeNav = 'Overview',
  setActiveNav,
  stats = { total: 0, inProgress: 0, completed: 0 }
}) {
  const navItems = [
    { id: 'Overview', label: 'Overview', icon: LayoutGrid, count: null },
    { id: 'My tasks', label: 'My tasks', icon: CheckSquare, count: stats.total },
    { id: 'Calendar', label: 'Calendar', icon: Calendar, count: null },
    { id: 'Settings', label: 'Settings', icon: Settings, count: null }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="main-sidebar"
        aria-label="Main Navigation"
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              {/* 4-square icon matching Figma */}
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <span className="w-1.5 h-1.5 bg-white rounded-xs"></span>
                <span className="w-1.5 h-1.5 bg-white/80 rounded-xs"></span>
                <span className="w-1.5 h-1.5 bg-white/80 rounded-xs"></span>
                <span className="w-1.5 h-1.5 bg-white rounded-xs"></span>
              </div>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900">FocusBoard</span>
              <span className="block text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">Workspace</span>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close navigation sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto">
          <div>
            <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Workspace
            </div>
            <nav className="space-y-1" aria-label="Sidebar Sections">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (setActiveNav) setActiveNav(item.id);
                      if (onClose) onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== null && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-indigo-200/60 text-indigo-800 font-bold'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick project categories */}
          <div className="pt-2 border-t border-slate-100">
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Categories
              </span>
              <Layers className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2.5 px-3.5 py-2 text-slate-600 hover:text-slate-900 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span>Design System</span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2 text-slate-600 hover:text-slate-900 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Development</span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2 text-slate-600 hover:text-slate-900 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Content & Research</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Quick Profile card at sidebar bottom */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">John Doe</p>
              <p className="text-[11px] text-slate-500 truncate">Product Designer</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </aside>
    </>
  );
}
