import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectToasts, removeToast } from '../store';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const dispatch = useDispatch();
  const toasts = useSelector(selectToasts);

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none font-mono">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 bg-[#262626] border text-xs shadow-xl transition-all border-l-4 animate-carbon-fade ${
              isSuccess
                ? 'border-[#393939] border-l-[#24a148] text-[#f4f4f4]'
                : isError
                ? 'border-[#393939] border-l-[#da1e28] text-[#f4f4f4]'
                : 'border-[#393939] border-l-[#0f62fe] text-[#f4f4f4]'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-[#24a148]" />}
              {isError && <AlertCircle className="w-4 h-4 text-[#da1e28]" />}
              {!isSuccess && !isError && <Info className="w-4 h-4 text-[#0f62fe]" />}
            </div>

            <div className="flex-1 text-xs font-medium leading-snug">
              {toast.message}
            </div>

            <button
              onClick={() => dispatch(removeToast(toast.id))}
              className="shrink-0 text-[#8d8d8d] hover:text-[#f4f4f4] transition-colors p-0.5"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
