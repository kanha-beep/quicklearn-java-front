import React from "react";

export function ShowChaptersList({ch, order}) {
  return (
    <div>
      <strong>Chapter name: {ch} , Order: {order}</strong>
      <ul className="list-disc ml-6 mt-2"></ul>
    </div>
  );
}
