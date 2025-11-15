import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }
    setUser(storedUser);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition duration-700 hover:scale-105">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-28 h-28 mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
              className="w-full h-full rounded-full border-4 border-indigo-400 shadow-md"
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            {user.full_name}
          </h2>
          <p className="text-gray-600 text-sm mb-6">👤 Profile Details</p>

          <div className="w-full text-left space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold text-indigo-600">📧 Email:</span>{" "}
              {user.email}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-indigo-600">🔒 Password:</span>{" "}
              ********
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300"
          >
            ⬅️ Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}


