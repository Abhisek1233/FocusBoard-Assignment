import React from 'react';
import { LayoutGrid, CheckSquare, Calendar, Settings } from 'lucide-react';

export default function MobileDock({ activeNav = 'Overview', setActiveNav, onOpenCreateTask }) {
  const items = [
    { id: 'Overview', label: 'Overview', icon: LayoutGrid },
    { id: 'My tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'Calendar', label: 'Calendar', icon: Calendar },
    { id: 'Settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 flex items-center justify-around shadow-lg"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeNav === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveNav(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
              isActive ? 'text-indigo-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
