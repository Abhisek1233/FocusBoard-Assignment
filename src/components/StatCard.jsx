import React from 'react';

export default function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  iconBgColor = 'bg-indigo-50',
  iconColor = 'text-indigo-600',
  badgeText,
  badgeTrend
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {value}
            </span>
            {badgeText && (
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  badgeTrend === 'up'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-indigo-50 text-indigo-700'
                }`}
              >
                {badgeText}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className={`w-11 h-11 rounded-xl ${iconBgColor} ${iconColor} flex items-center justify-center shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {subtext && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>{subtext}</span>
        </div>
      )}
    </div>
  );
}
