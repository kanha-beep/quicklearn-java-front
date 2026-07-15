import { OpenChapterButton } from "../Pages/OpenChapterButton.jsx";
import { Pencil, Trash2 } from "lucide-react";

export default function SubjectHomeCard({
  subject,
  navigate,
  classId,
  isAdmin = false,
  onEditSubject,
  onDeleteSubject,
  deletingSubjectId = "",
}) {
  return (
    <div className="py-2">
      <article className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <div className="mb-3">
          <h2 className="line-clamp-2 text-lg font-semibold text-slate-900">
            {(subject?.subject_name ?? "").toUpperCase()}
          </h2>
          <p className="mt-1 text-xs text-slate-500">Subject ID: {subject?._id}</p>
        </div>
        <div className="mt-4">
          <OpenChapterButton
            navigate={navigate}
            subject={subject}
            classId={classId}
          />
        </div>

        {isAdmin && (
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => onEditSubject?.(subject)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-200 px-4 py-2.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-50"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </button>
            <button
              type="button"
              disabled={deletingSubjectId === subject?._id}
              onClick={() => onDeleteSubject?.(subject)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Trash2 className="h-4 w-4" />
              {deletingSubjectId === subject?._id ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </article>
    </div>
  );
}
