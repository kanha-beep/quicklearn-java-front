import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import SubjectHomeCard from "../Subjects/SubjectHomeCard.jsx";
import { Loading } from "../Components/Loading.jsx";
import { useSubjects } from "../hooks.js";
import { ArrowLeft, X } from "lucide-react";
import { api } from "../../api.js";
import { getStoredRole, getStoredUser } from "../auth.js";

export default function SingleClassPage() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { subjects, isLoading } = useSubjects(classId);
  const [editingSubject, setEditingSubject] = useState(null);
  const [subjectForm, setSubjectForm] = useState({ subjectName: "", order: "" });
  const [isSavingSubject, setIsSavingSubject] = useState(false);
  const [deletingSubjectId, setDeletingSubjectId] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const storedRole = getStoredRole();
  const storedUser = getStoredUser();
  const userRole = storedUser?.roles || "";
  const isAdmin = storedRole === "admin" || userRole === "admin";

  useEffect(() => {
    setSubjectList(subjects);
  }, [subjects]);

  if (isLoading) {
    return (
      <Loading
        loading={isLoading}
        message="Loading subjects"
        detail="We’re bringing together the subjects available in this class."
      />
    );
  }

  const normalizedQuery = (searchParams.get("q") || "").trim().toLowerCase();
  const sourceSubjects = subjectList.length ? subjectList : subjects;
  const filterSubjects = sourceSubjects.filter((s) =>
    (s?.subject_name ?? "").toLowerCase().includes(normalizedQuery),
  );

  const openEditSubjectModal = (subject) => {
    setEditingSubject(subject);
    setSubjectForm({
      subjectName: subject?.subject_name || "",
      order: subject?.order ?? "",
    });
  };

  const closeEditSubjectModal = () => {
    if (isSavingSubject) return;
    setEditingSubject(null);
    setSubjectForm({ subjectName: "", order: "" });
  };

  const handleEditSubjectSubmit = async (event) => {
    event.preventDefault();
    if (!editingSubject || isSavingSubject) return;

    const subjectName = subjectForm.subjectName.trim();
    if (!subjectName) {
      window.alert("Subject name is required");
      return;
    }

    setIsSavingSubject(true);
    try {
      const response = await api.patch(`/api/subjects/${editingSubject._id}/edit`, {
        subjectName,
        order: subjectForm.order,
      });
      const updatedSubject = response?.data?.updatedSubject;
      setSubjectList((prevSubjects) =>
        (prevSubjects.length ? prevSubjects : subjects)
          .map((item) => (item._id === editingSubject._id ? updatedSubject : item))
          .sort(
            (a, b) =>
              (a.order ?? 0) - (b.order ?? 0) ||
              String(a.subject_name).localeCompare(String(b.subject_name)),
          ),
      );
      closeEditSubjectModal();
    } catch (error) {
      window.alert(error?.response?.data?.msg || "Failed to update subject");
    } finally {
      setIsSavingSubject(false);
    }
  };

  const handleDeleteSubject = async (subject) => {
    if (!subject?._id || deletingSubjectId) return;
    const confirmed = window.confirm(`Delete "${subject.subject_name}"?`);
    if (!confirmed) return;

    setDeletingSubjectId(subject._id);
    try {
      await api.delete(`/api/subjects/${subject._id}/delete`);
      setSubjectList((prevSubjects) =>
        (prevSubjects.length ? prevSubjects : subjects).filter((item) => item._id !== subject._id),
      );
    } catch (error) {
      window.alert(error?.response?.data?.msg || "Failed to delete subject");
    } finally {
      setDeletingSubjectId("");
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-3 sm:px-5 sm:py-5">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Class Workspace
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Subjects
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Search and open chapters for this class.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="text-sm font-medium text-slate-600">
            {filterSubjects.length} subject
            {filterSubjects.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filterSubjects.map((subject) => (
          <div key={subject?._id} className="min-w-0">
            <SubjectHomeCard
              subject={subject}
              navigate={navigate}
              classId={classId}
              isAdmin={isAdmin}
              onEditSubject={openEditSubjectModal}
              onDeleteSubject={handleDeleteSubject}
              deletingSubjectId={deletingSubjectId}
            />
          </div>
        ))}
      </div>

      {filterSubjects.length === 0 && (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-7 text-center">
          <h3 className="text-lg font-semibold text-slate-800">No subject found</h3>
          <p className="mt-1 text-sm text-slate-500">
            Try a different keyword or add a new subject.
          </p>
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={() => navigate("/")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:w-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          Go back to Classes
        </button>
      </div>

      {editingSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Subject Management
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">Edit Subject</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update the subject name and display order.
                </p>
              </div>
              <button
                type="button"
                onClick={closeEditSubjectModal}
                disabled={isSavingSubject}
                className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubjectSubmit} className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Subject Name
                </label>
                <input
                  type="text"
                  value={subjectForm.subjectName}
                  onChange={(event) =>
                    setSubjectForm((prev) => ({ ...prev, subjectName: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Order
                </label>
                <input
                  type="number"
                  value={subjectForm.order}
                  onChange={(event) =>
                    setSubjectForm((prev) => ({ ...prev, order: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeEditSubjectModal}
                  disabled={isSavingSubject}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingSubject}
                  className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSavingSubject ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
