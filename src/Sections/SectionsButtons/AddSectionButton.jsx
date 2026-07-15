import React, { useState } from "react";

export function AddSectionButton({ navigate, c, classId, subjectId, subjectName }) {
  const [selectedAction, setSelectedAction] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedAction("");

    if (!value) return;

    navigate(`/${classId}/${subjectId}/${c?._id}/add-sections`, {
      state: {
        addButton: value,
        chapterId: c._id,
        chapterName: c.chapter_name,
        subjectId,
        classId,
        subjectName,
      },
    });
  };

  return (
    <>
      <select
        value={selectedAction}
        onChange={handleChange}
        className="btn form-select-sm btn-outline-info btn-sm w-25"
      >
        <option value="">+</option>
        <option value="sections">Section</option>
        <option value="meanings">Meanings</option>
      </select>
    </>
  );
}
