import React from "react";

export function AddChapterButton({ handleAddChapter }) {
  return (
    <div>
      {" "}
      <button onClick={handleAddChapter} type="button" className="rounded">
        <i class="fa fa-plus"></i>
      </button>
    </div>
  );
}
