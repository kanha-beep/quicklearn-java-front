import React, { useState } from "react";

export function DeleteSectionButton({ handleDeleteSection, section }) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div>
      {" "}
      <button
        type="button"
        disabled={isDeleting}
        className="btn btn-outline-danger btn-sm disabled:cursor-not-allowed disabled:opacity-70"
        onClick={async () => {
          if (isDeleting) return;

          setIsDeleting(true);
          await handleDeleteSection(section?._id);
          setIsDeleting(false);
        }}
        aria-label={isDeleting ? "Deleting section" : "Delete section"}
      >
        {isDeleting ? "Deleting..." : <span className="bi bi-trash"></span>}
      </button>
    </div>
  );
}
