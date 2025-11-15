// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const [bookings, setBookings] = useState([]);
//   const [user, setUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   // useEffect — On Page Load
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (!storedUser) {
//       alert("Please log in first!");
//       navigate("/login");
//       return;
//     }

//     setUser(storedUser);

//     fetch(`http://127.0.0.1:8000/api/bookings/${storedUser.id}/`)
//       .then((res) => res.json())
//       .then((data) => {
//         setMessage(data.message || "");
//         setBookings(data.bookings || []);
//       })
//       .catch((err) => console.error("Error fetching bookings:", err));
//   }, [navigate]);

//   // handleDelete() — Delete Booking
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`http://127.0.0.1:8000/api/bookings/${id}/delete/`, {
//         method: "DELETE",
//       });

//       if (res.ok) {
//         setBookings((prev) => prev.filter((b) => b.id !== id));
//         alert("✅ Booking deleted successfully!");
//       } else {
//         alert("❌ Failed to delete booking");
//       }
//     } catch (error) {
//       console.error("Error deleting booking:", error);
//       alert("❌ Error deleting booking");
//     }
//   };

//   // handleLogout() — Log Out
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     alert("Logged out successfully!");
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
//       {/* 🔹 Top Section */}
//       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-8">
//         {user && (
//           <div className="flex flex-col sm:flex-row justify-between items-center">
//             <div>
//               <h2 className="text-3xl font-bold text-gray-800">
//                 Welcome,{" "}
//                 <span className="text-blue-600">{user.full_name}</span> 👋
//               </h2>
//               <p className="text-gray-600 mt-2">📧 {user.email}</p>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
//               <button
//                 onClick={() => navigate("/profile")}
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300"
//               >
//                 👤 View Profile
//               </button>

//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300"
//               >
//                 🚪 Logout
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* 🧹 Optional message from backend */}
//       {message && (
//         <div className="max-w-5xl mx-auto bg-green-100 border border-green-300 text-green-800 p-3 rounded-lg mb-6 text-center">
//           {message}
//         </div>
//       )}

//       {/* 📅 Booking Section */}
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//           Your Bookings 📋
//         </h2>

//         {bookings.length === 0 ? (
//           <p className="text-center text-gray-500 text-lg">
//             No bookings yet. Start booking your breakfast! 🍳
//           </p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {bookings.map((b) => (
//               <div
//                 key={b.id}
//                 className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
//               >
//                 {b.img && (
//                   <img
//                     src={b.img}
//                     alt={b.name}
//                     className="w-full h-40 object-cover rounded-t-xl"
//                   />
//                 )}
//                 <div className="p-4">
//                   <h3 className="text-xl font-semibold text-blue-700 mb-1">
//                     {b.name || "Breakfast Item"}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-3">{b.desc}</p>

//                   <div className="text-sm space-y-1 text-black">
//                     <p><span className="font-medium">📅 Date:</span> {b.date}</p>
//                     <p><span className="font-medium">⏰ Time:</span> {b.time}</p>
//                     <p><span className="font-medium">👥 Guests:</span> {b.guests}</p>
//                     <p><span className="font-medium">💰 Total Price:</span> ₹{b.totalprice}</p>
//                     <p><span className="font-medium">💳 Payment:</span> {b.payment}</p>
//                   </div>

//                   <button
//                     onClick={() => handleDelete(b.id)}
//                     className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
//                   >
//                     🗑️ Delete Booking
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_URL = "https://breakfast-backend-lpm3.onrender.com/api";

  // Load user + fetch bookings
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    setUser(storedUser);

    fetch(`${API_URL}/bookings/${storedUser.id}/`)
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message || "");
        setBookings(data.bookings || []);
      })
      .catch((err) => console.error("Error fetching bookings:", err));
  }, [navigate]);

  // Delete booking
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/bookings/${id}/delete/`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        alert("✅ Booking deleted successfully!");
      } else {
        alert("❌ Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("❌ Error deleting booking");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      {/* Top Section */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-8">
        {user && (
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Welcome,{" "}
                <span className="text-blue-600">{user.full_name}</span> 👋
              </h2>
              <p className="text-gray-600 mt-2">📧 {user.email}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
              <button
                onClick={() => navigate("/profile")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300"
              >
                👤 View Profile
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Backend Message */}
      {message && (
        <div className="max-w-5xl mx-auto bg-green-100 border border-green-300 text-green-800 p-3 rounded-lg mb-6 text-center">
          {message}
        </div>
      )}

      {/* Booking Section */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Your Bookings 📋
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No bookings yet. Start booking your breakfast! 🍳
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {b.img && (
                  <img
                    src={b.img}
                    alt={b.name}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-blue-700 mb-1">
                    {b.name || "Breakfast Item"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{b.desc}</p>

                  <div className="text-sm space-y-1 text-black">
                    <p><span className="font-medium">📅 Date:</span> {b.date}</p>
                    <p><span className="font-medium">⏰ Time:</span> {b.time}</p>
                    <p><span className="font-medium">👥 Guests:</span> {b.guests}</p>
                    <p><span className="font-medium">💰 Total Price:</span> ₹{b.totalprice}</p>
                    <p><span className="font-medium">💳 Payment:</span> {b.payment}</p>
                  </div>

                  <button
                    onClick={() => handleDelete(b.id)}
                    className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
                  >
                    🗑️ Delete Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
