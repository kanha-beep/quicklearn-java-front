import React from "react";

export function SaveChapterButton({ isSubmitting = false }) {
  return (
    <div>
      <button
        disabled={isSubmitting}
        className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Saving Chapters..." : "Save Chapters"}
      </button>
    </div>
  );
}
