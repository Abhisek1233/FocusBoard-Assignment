import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  taskTitle = ''
}) {
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

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1.5 flex-1">
              <h3 id="delete-dialog-title" className="text-base font-bold text-slate-900">
                Delete task?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to permanently delete{' '}
                <span className="font-semibold text-slate-800">"{taskTitle}"</span>? This action cannot be undone.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cancel deletion"
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-98 rounded-xl shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
