import React, { useState } from "react";
import { ArrowLeft, PencilLine } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../../api";

export default function EditChapters() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { subjectId, chapterId, classId } = useParams();
  const initialOrder = state?.chapterO ?? "";
  const initialChapterName = state?.chapterN ?? "";
  const [order, setOrder] = useState(initialOrder);
  const [chapterName, setChapterName] = useState(initialChapterName);
  const [isSaving, setIsSaving] = useState(false);

  const handleChapterDataUpdate = async (e) => {
    e.preventDefault();

    if (!chapterName.trim()) {
      alert("Chapter name is required");
      return;
    }

    setIsSaving(true);
    try {
      await api.patch(`/api/subjects/${subjectId}/chapters/${chapterId}/edit`, {
        chapterName: chapterName.trim(),
        order,
      });
      navigate(`/${classId}/subjects/${subjectId}/chapters`);
    } catch (err) {
      console.error("Error updating chapter: ", err?.response?.data || err);
      alert("Failed to update chapter");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:py-6">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-amber-50 via-white to-cyan-50 p-4 shadow-sm sm:p-6">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Chapter Builder
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Edit Chapter
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Update the chapter name or order, then save your changes.
          </p>
        </div>

        <form onSubmit={handleChapterDataUpdate} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_10rem]">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Chapter Name
              </label>
              <input
                type="text"
                placeholder="Enter chapter name"
                name="chapterName"
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Order
              </label>
              <input
                type="number"
                placeholder="1"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-sm font-semibold text-slate-800">
                  Current Chapter
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review the updated chapter details before saving.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                1 chapter
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-white/80 px-4 py-3">
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Chapter
                </p>
                <strong className="text-slate-800">
                  {chapterName.trim() || "Untitled Chapter"}
                </strong>
              </div>
              <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
                Order {order || "-"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              <PencilLine className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save Chapter"}
            </button>

            <button
              type="button"
              onClick={() => navigate(`/${classId}/subjects/${subjectId}/chapters`)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Chapters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
