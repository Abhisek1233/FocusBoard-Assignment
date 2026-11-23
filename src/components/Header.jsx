import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, ChevronDown, Plus, LogOut, Home, Settings, User } from 'lucide-react';

export default function Header({
  onOpenSidebar,
  onOpenCreateTask,
  activeNav = 'Overview',
  setActiveNav,
  onLogout
}) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsUserMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

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

        {/* Mobile Brand Title / Home link */}
        <button
          type="button"
          onClick={() => setActiveNav && setActiveNav('Overview')}
          className="flex lg:hidden items-center gap-2 text-left focus:outline-none"
        >
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            FB
          </div>
          <span className="font-bold text-slate-900 text-sm">FocusBoard</span>
        </button>

        {/* Desktop Breadcrumb */}
        <nav aria-label="Breadcrumb" className="hidden lg:flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => setActiveNav && setActiveNav('Overview')}
            className="text-slate-500 hover:text-indigo-600 font-medium transition-colors"
          >
            Workspace (Home)
          </button>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-900">{activeNav}</span>
        </nav>
      </div>

      {/* Right Controls: Quick Add button, Notification, User Avatar & Menu */}
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

        {/* User Avatar & Dropdown Menu */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            aria-expanded={isUserMenuOpen}
            aria-haspopup="true"
            aria-label="User profile and logout menu"
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100/80 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-bold flex items-center justify-center text-xs shadow-xs">
              JD
            </div>
            <div className="hidden md:block text-left">
              <span className="block text-xs font-semibold text-slate-900 leading-tight">John Doe</span>
              <span className="block text-[10px] text-slate-500 leading-tight">Admin</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isUserMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
            >
              {/* User info header */}
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">John Doe</p>
                <p className="text-[11px] text-slate-500 truncate">abhisekbehera506@gmail.com</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-bold rounded-full bg-indigo-50 text-indigo-700">
                  Active Session
                </span>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    if (setActiveNav) setActiveNav('Overview');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                >
                  <Home className="w-4 h-4 text-slate-400" />
                  <span>Dashboard Home</span>
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    if (setActiveNav) setActiveNav('Settings');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Settings & Profile</span>
                </button>
              </div>

              {/* Logout Button */}
              <div className="pt-1 border-t border-slate-100">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
