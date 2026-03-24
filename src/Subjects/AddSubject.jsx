import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import { useAddSubject } from "../hooks";

export default function AddClass() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState("");
  const [order, setOrder] = useState("");
  const addSubjectCalled = useAddSubject();

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      await addSubjectCalled(classId, subjectName, order);
      return navigate(`/${classId}`);
    } catch (error) {
      console.log("error adding class: ", error?.response?.data?.msg);
      return navigate(`/${classId}`);
    }
  };

  return (
    <div>
      <h1>Add Class</h1>
      <form onSubmit={handleAddSubject}>
        <select
          className="w-full border p-3 rounded mb-6"
          onChange={(e) => setSubjectName(e.target.value)}
          value={subjectName}
        >
          <option value="">Select Subject</option>
          <option value="english">English</option>
          <option value="hindi">hindi</option>
          <option value="mathematics">Mathematics</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
          <option value="biology">Biology</option>
          <option value="history">History</option>
          <option value="geography">Geography</option>
          <option value="polity">Polity</option>
          <option value="economy">Economics</option>
          <option value="arts">Arts</option>
          <option value="music">Music</option>
        </select>
        <input
          type="number"
          placeholder="Enter Number"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-secondary my-2">Add Subject</button>
      </form>
    </div>
  );
}
