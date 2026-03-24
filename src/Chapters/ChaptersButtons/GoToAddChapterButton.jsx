import React from "react";
import { useParams } from "react-router-dom";

export function GoToAddChapterButton({ navigate, _id, classId, subjectName }) {
  const { classId: routeClassId } = useParams();
  const effectiveClassId = classId || routeClassId;

  return (
    <div>
      <button
        disabled={!effectiveClassId}
        onClick={() =>
          navigate(`/${effectiveClassId}/${_id}/add-chapters`, {
            state: { subjectName },
          })
        }
        className="btn btn-outline-danger"
      >
        <span>Add Chapters</span>
      </button>
    </div>
  );
}
