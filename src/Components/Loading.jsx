import React from "react";

export function Loading({
  loading,
  message = "Loading...",
  detail = "Please wait while we prepare everything for you.",
}) {
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4">
        <div className="flex w-full max-w-md flex-col items-center rounded-3xl border border-slate-200 bg-white/95 px-8 py-10 text-center shadow-sm">
          <div className="relative mb-5 flex h-14 w-14 items-center justify-center">
            <div className="absolute h-14 w-14 rounded-full border-4 border-slate-200" />
            <div className="absolute h-14 w-14 animate-spin rounded-full border-4 border-transparent border-t-sky-500 border-r-emerald-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
          </div>

          <h2 className="text-lg font-semibold text-slate-900">{message}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
        </div>
      </div>
    );
  }
  return;
}
