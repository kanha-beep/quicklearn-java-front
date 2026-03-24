import { useEffect, useState } from "react";
import { api } from "../../api.js";
import ClassHomeCard from "../Pages/ClassHomeCard.jsx";
import { Loading } from "../Components/Loading.jsx";
import { MainPageHeading } from "../Pages/MainPageHeading.jsx";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getAllClasses = async () => {
      const res = await api.get("/class");
      setClasses(res?.data?.getAllClasses || []);
      setLoading(false);
    };
    getAllClasses();
  }, []);

  if (loading) return <Loading loading={loading} />;

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredClasses = classes.filter((cl) => {
    const className = (cl?.class_name ?? "").toString().toLowerCase();
    const classOrder = (cl?.order ?? "").toString().toLowerCase();
    const classId = (cl?._id ?? "").toString().toLowerCase();
    return (
      className.includes(normalizedQuery) ||
      classOrder.includes(normalizedQuery) ||
      classId.includes(normalizedQuery)
    );
  });

  return (
    <div className="mx-auto w-full max-w-7xl p-2">
      <MainPageHeading />

      <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm w-[14rem]">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search class"
            className="form-control py-2 text-xs"
          />
        </div>
      </section>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">
          {filteredClasses.length} class{filteredClasses.length !== 1 ? "es" : ""}
        </p>
      </div>

      <div className="row mt-4">
        {filteredClasses.map((cl, index) => (
          <div key={cl._id} className="col-md-2 col-2">
            <ClassHomeCard subject={cl} navigate={navigate} index={index} />
          </div>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <h3 className="text-lg font-semibold text-slate-800">No class found</h3>
          <p className="mt-1 text-sm text-slate-500">
            Try another keyword or create a new class.
          </p>
        </div>
      )}
    </div>
  );
}
