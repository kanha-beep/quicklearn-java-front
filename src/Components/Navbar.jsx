import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const roles = localStorage.getItem("roles");
  const isLoggedIn = !!token && token !== "undefined" && token !== "null";
  const isAdmin = roles === "admin";

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-black backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex flex-col items-start">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 text-black bg-white px-3 py-2 text-sm font-semibold shadow-sm transition hover:border-blue-500 hover:text-blue-600"
          >
            <GraduationCap className="h-5 w-5" />
            <span>FSSA</span>
          </button>
          <span className="mt-1 text-xs font-medium text-white">
            Your Learning Companion
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isLoggedIn && isAdmin && (
            <button
              className="rounded-lg border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
          )}
          {!isLoggedIn ? (
            <button
              className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
              onClick={() => navigate("/auth")}
            >
              Login
            </button>
          ) : (
            <button
              className="rounded-lg border border-rose-200 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("tokens");
                localStorage.removeItem("user");
                localStorage.removeItem("roles");
                navigate("/auth");
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
