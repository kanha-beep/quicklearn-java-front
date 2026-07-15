import React, { useState } from "react";
import { useDeleteChapter } from "../../hooks";

export function DeleteChapterButton({ chapter, subjectId, onDelete }) {
  const deleteChapter = useDeleteChapter();
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div>
      <button
        type="button"
        disabled={isDeleting}
        className="btn btn-outline-danger btn-sm disabled:cursor-not-allowed disabled:opacity-70"
        onClick={async () => {
          if (isDeleting) return;

          setIsDeleting(true);
          await deleteChapter(subjectId, chapter?._id);
          if (typeof onDelete === "function") {
            onDelete(chapter?._id);
          }
          setIsDeleting(false);
        }}
        aria-label={isDeleting ? "Deleting chapter" : "Delete chapter"}
      >
        {isDeleting ? "Deleting..." : <span className="bi bi-trash fs-7"></span>}
      </button>
    </div>
  );
}
