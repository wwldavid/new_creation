"use client";

import { useContext, useState } from "react";
import { AdminContext } from "@/context/AdminContext";
import { useRouter } from "next/navigation";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function AdminPage() {
  const { isAdmin, login, logout } = useContext(AdminContext);
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleLogin = async () => {
    const ok = await login(pw);
    if (!ok) {
      setError("Wrong password");
    } else {
      router.push("/");
    }
  };

  if (!isAdmin) {
    return (
      <div className="h-[calc(100vh-110px)] flex items-center justify-center">
        <div className="w-full max-w-md flex-shrink-0  mt-20 p-6 bg-[#c4d3d5] rounded shadow-lg">
          <h1 className="text-2xl mb-4">Admin Login</h1>

          <div className="relative mb-2 ">
            <input
              type={showPw ? "text" : "password"}
              className="w-full border px-3 py-2 rounded mb-2"
              placeholder="Please input admin password"
              value={pw}
              onChange={(e) => {
                setError("");
                setPw(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute inset-y-0 right-3 flext items-center text-gray-500"
            >
              {showPw ? (
                <IoEyeOffOutline size={20} />
              ) : (
                <IoEyeOutline size={20} />
              )}
            </button>
          </div>

          <div className="flex space-x-4 mb-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-500 text-white py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleLogin}
              className="flex-1 bg-[#647a5c] text-white py-2 rounded"
            >
              Login
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-110px)] flex items-center justify-center">
      <div className="w-full max-w-md flex-shrink-0  mt-20 p-6 bg-[#c4d3d5] rounded shadow text-center">
        <h1 className="text-2xl mb-4">Welcome, Admin</h1>
        <button
          onClick={logout}
          className="bg-[#b59959] text-white py-2 px-4 rounded shadow-sm shadow-[#495859]"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
