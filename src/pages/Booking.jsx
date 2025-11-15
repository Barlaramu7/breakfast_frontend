// import { useEffect, useState } from "react";

// export default function Booking() {
//   const [bookings, setBookings] = useState([]);
//   const [paymentSelections, setPaymentSelections] = useState({});
//   const [editingBooking, setEditingBooking] = useState(null);
//   const [formData, setFormData] = useState({ date: "", time: "", guests: 1 });

//   const today = new Date().toISOString().split("T")[0];

//   const fetchBookings = async () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       alert("Please log in first!");
//       return;
//     }

//     try {
//       const res = await fetch(`http://127.0.0.1:8000/api/bookings/${user.id}/`);
//       const data = await res.json();
//       setBookings(data.bookings || []);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//     }
//   };

//   const removeExpiredBookings = async () => {
//     const now = new Date();
//     const todayDate = now.toISOString().split("T")[0];
//     const expired = bookings.filter((b) => b.date < todayDate);

//     for (const b of expired) {
//       try {
//         await fetch(`http://127.0.0.1:8000/api/bookings/${b.id}/delete/`, {
//           method: "DELETE",
//         });
//       } catch (err) {
//         console.error("Error deleting expired booking:", err);
//       }
//     }

//     setBookings(bookings.filter((b) => b.date >= todayDate));
//   };

//   const getMsUntilMidnight = () => {
//     const now = new Date();
//     const midnight = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate() + 1,
//       0,
//       0,
//       0
//     );
//     return midnight - now;
//   };

//   useEffect(() => {
//     fetchBookings();

//     const cleanupAtMidnight = () => {
//       removeExpiredBookings();
//       setInterval(removeExpiredBookings, 24 * 60 * 60 * 1000);
//     };

//     const timeout = setTimeout(cleanupAtMidnight, getMsUntilMidnight());
//     return () => clearTimeout(timeout);
//   }, []);

//   const groupBookingsByDate = (bookings) => {
//     return bookings.reduce((acc, booking) => {
//       if (!acc[booking.date]) acc[booking.date] = [];
//       acc[booking.date].push(booking);
//       return acc;
//     }, {});
//   };

//   const bookingsByDate = groupBookingsByDate(bookings);

//   const handlePaymentSelect = (bookingId, type) => {
//     setPaymentSelections((prev) => ({ ...prev, [bookingId]: type }));
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this booking?")) return;

//     const res = await fetch(
//       `http://127.0.0.1:8000/api/bookings/${id}/delete/`,
//       { method: "DELETE" }
//     );
//     if (res.ok) {
//       setBookings(bookings.filter((b) => b.id !== id));
//       const updatedPayment = { ...paymentSelections };
//       delete updatedPayment[id];
//       setPaymentSelections(updatedPayment);
//       alert("Booking deleted successfully!");
//     } else {
//       alert("Failed to delete booking");
//     }
//   };

//   const handleEdit = (booking) => {
//     setEditingBooking(booking);
//     setFormData({
//       date: booking.date,
//       time: booking.time,
//       guests: booking.guests,
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     const res = await fetch(
//       `http://127.0.0.1:8000/api/bookings/${editingBooking.id}/update/`,
//       {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData }),
//       }
//     );

//     if (res.ok) {
//       const updatedBooking = await res.json();
//       const updated = bookings.map((b) =>
//         b.id === editingBooking.id ? updatedBooking : b
//       );
//       setBookings(updated);
//       setEditingBooking(null);
//       alert("Booking updated successfully!");
//     } else {
//       alert("Failed to update booking");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-5 flex flex-col items-center">
//       <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
//         📅 Your Bookings
//       </h1>

//       {bookings.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg">
//           No bookings yet! Go to the Menu and add one 🥞
//         </p>
//       ) : (
//         <div className="space-y-10 w-full">
//           {Object.keys(bookingsByDate)
//             .sort()
//             .map((date) => {
//               const dailyBookings = bookingsByDate[date].sort((a, b) =>
//                 a.time.localeCompare(b.time)
//               );
//               const totalPrice = dailyBookings.reduce(
//                 (sum, b) => sum + b.total_price,
//                 0
//               );

//               return (
//                 <div
//                   key={date}
//                   className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 w-full"
//                 >
//                   <div className="flex justify-between items-center mb-5 border-b pb-3">
//                     <h2 className="text-2xl font-bold text-blue-700">📅 {date}</h2>
//                     <p className="text-green-600 font-semibold text-lg">
//                       Total: ₹{totalPrice}
//                     </p>
//                   </div>

//                   <div className="flex flex-wrap justify-center gap-6">
//                     {dailyBookings.map((b) => (
//                       <div
//                         key={b.id}
//                         className="bg-gray-50 p-4 rounded-xl shadow-md flex flex-col justify-between border border-gray-200 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-80"
//                       >
//                         {b.img && (
//                           <div className="w-full h-48 overflow-hidden rounded-xl mb-3 relative">
//                             <img
//                               src={b.img}
//                               alt={b.name}
//                               className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                             />
//                           </div>
//                         )}

//                         <h3 className="font-bold text-orange-600 text-lg mb-1">
//                           {b.name}
//                         </h3>
//                         <p className="text-sm text-black">{b.desc}</p>
//                         <p className="text-sm font-semibold text-black mt-1">
//                           ⏰ Time: {b.time}
//                         </p>
//                         <p className="text-sm font-semibold text-black">
//                           👥 Guests: {b.guests}
//                         </p>
//                         <p className="text-sm font-semibold text-black">
//                           💰 Price per Guest: ₹{b.price}
//                         </p>
//                         <p className="text-lg font-bold text-green-600 mt-1">
//                           Total: ₹{b.total_price}
//                         </p>

//                         <div className="mt-3 flex gap-3 justify-center">
//                           <button
//                             onClick={() => handlePaymentSelect(b.id, "Online")}
//                             className={`px-4 py-2 rounded-full font-semibold transition border-2 ${
//                               paymentSelections[b.id] === "Online"
//                                 ? "bg-green-300 text-black border-green-700 shadow-lg scale-105"
//                                 : "bg-green-100 text-black border-green-300 hover:bg-green-200"
//                             }`}
//                           >
//                             💳 Online
//                           </button>
//                           <button
//                             onClick={() => handlePaymentSelect(b.id, "Cash")}
//                             className={`px-4 py-2 rounded-full font-semibold transition border-2 ${
//                               paymentSelections[b.id] === "Cash"
//                                 ? "bg-gray-400 text-black border-gray-900 shadow-lg scale-105"
//                                 : "bg-gray-200 text-black border-gray-400 hover:bg-gray-300"
//                             }`}
//                           >
//                             💵 Cash
//                           </button>
//                         </div>

//                         <div className="mt-3 flex justify-between gap-2">
//                           <button
//                             onClick={() => handleEdit(b)}
//                             className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-3 py-1 rounded-lg text-sm"
//                           >
//                             ✏️ Modify
//                           </button>
//                           <button
//                             onClick={() => handleDelete(b.id)}
//                             className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-lg text-sm"
//                           >
//                             🗑️ Delete
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//         </div>
//       )}

//       {/* Modify Popup */}
//       {editingBooking && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white/95 shadow-2xl rounded-3xl p-6 sm:p-8 w-80 sm:w-96 border border-orange-300 relative animate-[pop_0.3s_ease-out] max-h-[90vh] sm:max-h-none overflow-hidden">
//             <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-orange-600 mb-4 drop-shadow-sm">
//               ✏️ Modify {editingBooking.name}
//             </h2>
//             {editingBooking.img && (
//               <img
//                 src={editingBooking.img}
//                 alt={editingBooking.name}
//                 className="w-full h-32 sm:h-40 object-cover rounded-xl mb-4 shadow-md border border-orange-100"
//               />
//             )}
//             <p className="text-center text-gray-700 mb-4 sm:mb-6 italic text-sm">
//               “{editingBooking.desc}”
//             </p>

//             {/* Date */}
//             <div className="mb-3 sm:mb-4">
//               <label className="block text-gray-800 font-semibold mb-1">
//                 📅 Date
//               </label>
//               <input
//                 type="date"
//                 name="date"
//                 min={today}
//                 value={formData.date}
//                 onChange={handleChange}
//                 className="w-full border border-orange-300 rounded-xl p-2.5 sm:p-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition bg-white"
//               />
//             </div>

//             {/* Time */}
//             <div className="mb-3 sm:mb-4">
//               <label className="block text-gray-800 font-semibold mb-1">
//                 ⏰ Time
//               </label>
//               <input
//                 type="time"
//                 name="time"
//                 value={formData.time}
//                 onChange={handleChange}
//                 className="w-full border border-orange-300 rounded-xl p-2.5 sm:p-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition bg-white"
//               />
//             </div>

//             {/* Guests */}
//             <div className="mb-5 sm:mb-6">
//               <label className="block text-gray-800 font-semibold mb-1">
//                 👥 Guests
//               </label>
//               <input
//                 type="number"
//                 name="guests"
//                 min="1"
//                 value={formData.guests}
//                 onChange={handleChange}
//                 className="w-full border border-orange-300 rounded-xl p-2.5 sm:p-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition bg-white"
//               />
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-between gap-3 sm:gap-4 mt-5 sm:mt-6">
//               <button
//                 onClick={handleSave}
//                 className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl shadow-lg hover:shadow-orange-400/50 hover:scale-105 transition-transform duration-200"
//               >
//                 💾 Save
//               </button>
//               <button
//                 onClick={() => setEditingBooking(null)}
//                 className="flex-1 bg-gray-100 text-gray-800 font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl shadow hover:bg-gray-200 hover:scale-105 transition-transform duration-200"
//               >
//                 ❌ Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";

// function Booking({ user }) {
//   const [bookings, setBookings] = useState([]);
//   const [editingBooking, setEditingBooking] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     date: "",
//     time: "",
//     guests: "",
//   });

//   const API_URL = "https://breakfast-backend-lpm3.onrender.com/api";

//   // Fetch all bookings of this user
//   const fetchBookings = async () => {
//     try {
//       const res = await fetch(`${API_URL}/bookings/${user.id}/`);
//       const data = await res.json();
//       setBookings(data);
//     } catch (error) {
//       console.log("Error fetching bookings:", error);
//     }
//   };

//   // Auto delete expired bookings
//   const deleteExpiredBookings = async () => {
//     const now = new Date();

//     bookings.forEach(async (b) => {
//       const bookingDateTime = new Date(`${b.date}T${b.time}`);

//       if (bookingDateTime < now) {
//         await fetch(`${API_URL}/bookings/${b.id}/delete/`, {
//           method: "DELETE",
//         });
//       }
//     });

//     fetchBookings();
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   useEffect(() => {
//     deleteExpiredBookings();
//   }, [bookings]);

//   // Delete a booking manually
//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`${API_URL}/bookings/${id}/delete/`, {
//         method: "DELETE",
//       });

//       if (res.ok) {
//         fetchBookings();
//       }
//     } catch (error) {
//       console.log("Error deleting booking:", error);
//     }
//   };

//   // Start editing booking
//   const handleEdit = (b) => {
//     setEditingBooking(b);
//     setFormData({
//       name: b.name,
//       email: b.email,
//       phone: b.phone,
//       date: b.date,
//       time: b.time,
//       guests: b.guests,
//     });
//   };

//   // Update booking request
//   const handleUpdate = async () => {
//     try {
//       const res = await fetch(`${API_URL}/bookings/${editingBooking.id}/update/`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         setEditingBooking(null);
//         fetchBookings();
//       }
//     } catch (error) {
//       console.log("Update error:", error);
//     }
//   };

//   return (
//     <div className="booking-container">
//       <h2>My Bookings</h2>

//       {/* If no bookings */}
//       {bookings.length === 0 && <p>No bookings yet.</p>}

//       {/* List of Bookings */}
//       {bookings.map((b) => (
//         <div key={b.id} className="booking-card">
//           <p><strong>Name:</strong> {b.name}</p>
//           <p><strong>Email:</strong> {b.email}</p>
//           <p><strong>Phone:</strong> {b.phone}</p>
//           <p><strong>Date:</strong> {b.date}</p>
//           <p><strong>Time:</strong> {b.time}</p>
//           <p><strong>Guests:</strong> {b.guests}</p>

//           <button onClick={() => handleEdit(b)}>Edit</button>
//           <button onClick={() => handleDelete(b.id)} className="delete-btn">Delete</button>
//         </div>
//       ))}

//       {/* Edit Form */}
//       {editingBooking && (
//         <div className="edit-form">
//           <h3>Edit Booking</h3>

//           <input
//             type="text"
//             placeholder="Name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           />

//           <input
//             type="text"
//             placeholder="Phone"
//             value={formData.phone}
//             onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//           />

//           <input
//             type="date"
//             value={formData.date}
//             onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//           />

//           <input
//             type="time"
//             value={formData.time}
//             onChange={(e) => setFormData({ ...formData, time: e.target.value })}
//           />

//           <input
//             type="number"
//             placeholder="Guests"
//             value={formData.guests}
//             onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
//           />

//           <button onClick={handleUpdate}>Update Booking</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Booking;




import { useEffect, useState } from "react";

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [paymentSelections, setPaymentSelections] = useState({});
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({ date: "", time: "", guests: 1 });

  const today = new Date().toISOString().split("T")[0];

  const API = "https://breakfast-backend-lpm3.onrender.com";

  const fetchBookings = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in first!");
      return;
    }

    try {
      const res = await fetch(`${API}/api/bookings/${user.id}/`);
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const removeExpiredBookings = async () => {
    const now = new Date();
    const todayDate = now.toISOString().split("T")[0];
    const expired = bookings.filter((b) => b.date < todayDate);

    for (const b of expired) {
      try {
        await fetch(`${API}/api/bookings/${b.id}/delete/`, {
          method: "DELETE",
        });
      } catch (err) {
        console.error("Error deleting expired booking:", err);
      }
    }

    setBookings(bookings.filter((b) => b.date >= todayDate));
  };

  const getMsUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    );
    return midnight - now;
  };

  useEffect(() => {
    fetchBookings();

    const cleanupAtMidnight = () => {
      removeExpiredBookings();
      setInterval(removeExpiredBookings, 24 * 60 * 60 * 1000);
    };

    const timeout = setTimeout(cleanupAtMidnight, getMsUntilMidnight());
    return () => clearTimeout(timeout);
  }, []);

  const groupBookingsByDate = (bookings) => {
    return bookings.reduce((acc, booking) => {
      if (!acc[booking.date]) acc[booking.date] = [];
      acc[booking.date].push(booking);
      return acc;
    }, {});
  };

  const bookingsByDate = groupBookingsByDate(bookings);

  const handlePaymentSelect = (bookingId, type) => {
    setPaymentSelections((prev) => ({ ...prev, [bookingId]: type }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    const res = await fetch(`${API}/api/bookings/${id}/delete/`, {
      method: "DELETE",
    });

    if (res.ok) {
      setBookings(bookings.filter((b) => b.id !== id));
      const updatedPayment = { ...paymentSelections };
      delete updatedPayment[id];
      setPaymentSelections(updatedPayment);
      alert("Booking deleted successfully!");
    } else {
      alert("Failed to delete booking");
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setFormData({
      date: booking.date,
      time: booking.time,
      guests: booking.guests,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const res = await fetch(`${API}/api/bookings/${editingBooking.id}/update/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData }),
    });

    if (res.ok) {
      const updatedBooking = await res.json();
      const updated = bookings.map((b) =>
        b.id === editingBooking.id ? updatedBooking : b
      );
      setBookings(updated);
      setEditingBooking(null);
      alert("Booking updated successfully!");
    } else {
      alert("Failed to update booking");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        📅 Your Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No bookings yet! Go to the Menu and add one 🥞
        </p>
      ) : (
        <div className="space-y-10 w-full">
          {Object.keys(bookingsByDate)
            .sort()
            .map((date) => {
              const dailyBookings = bookingsByDate[date].sort((a, b) =>
                a.time.localeCompare(b.time)
              );
              const totalPrice = dailyBookings.reduce(
                (sum, b) => sum + b.total_price,
                0
              );

              return (
                <div
                  key={date}
                  className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 w-full"
                >
                  <div className="flex justify-between items-center mb-5 border-b pb-3">
                    <h2 className="text-2xl font-bold text-blue-700">📅 {date}</h2>
                    <p className="text-green-600 font-semibold text-lg">
                      Total: ₹{totalPrice}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-6">
                    {dailyBookings.map((b) => (
                      <div
                        key={b.id}
                        className="bg-gray-50 p-4 rounded-xl shadow-md flex flex-col justify-between border border-gray-200 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-80"
                      >
                        {b.img && (
                          <div className="w-full h-48 overflow-hidden rounded-xl mb-3 relative">
                            <img
                              src={b.img}
                              alt={b.name}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                        )}

                        <h3 className="font-bold text-orange-600 text-lg mb-1">
                          {b.name}
                        </h3>
                        <p className="text-sm text-black">{b.desc}</p>
                        <p className="text-sm font-semibold text-black mt-1">
                          ⏰ Time: {b.time}
                        </p>
                        <p className="text-sm font-semibold text-black">
                          👥 Guests: {b.guests}
                        </p>
                        <p className="text-sm font-semibold text-black">
                          💰 Price per Guest: ₹{b.price}
                        </p>
                        <p className="text-lg font-bold text-green-600 mt-1">
                          Total: ₹{b.total_price}
                        </p>

                        <div className="mt-3 flex gap-3 justify-center">
                          <button
                            onClick={() => handlePaymentSelect(b.id, "Online")}
                            className={`px-4 py-2 rounded-full font-semibold transition border-2 ${
                              paymentSelections[b.id] === "Online"
                                ? "bg-green-300 text-black border-green-700 shadow-lg scale-105"
                                : "bg-green-100 text-black border-green-300 hover:bg-green-200"
                            }`}
                          >
                            💳 Online
                          </button>
                          <button
                            onClick={() => handlePaymentSelect(b.id, "Cash")}
                            className={`px-4 py-2 rounded-full font-semibold transition border-2 ${
                              paymentSelections[b.id] === "Cash"
                                ? "bg-gray-400 text-black border-gray-900 shadow-lg scale-105"
                                : "bg-gray-200 text-black border-gray-400 hover:bg-gray-300"
                            }`}
                          >
                            💵 Cash
                          </button>
                        </div>

                        <div className="mt-3 flex justify-between gap-2">
                          <button
                            onClick={() => handleEdit(b)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-3 py-1 rounded-lg text-sm"
                          >
                            ✏️ Modify
                          </button>
                          <button
                            onClick={() => handleDelete(b.id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-lg text-sm"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Modify Popup */}
      {editingBooking && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 shadow-2xl rounded-3xl p-6 sm:p-8 w-80 sm:w-96 border border-orange-300 relative">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-orange-600 mb-4">
              ✏️ Modify {editingBooking.name}
            </h2>

            {editingBooking.img && (
              <img
                src={editingBooking.img}
                alt={editingBooking.name}
                className="w-full h-32 sm:h-40 object-cover rounded-xl mb-4 shadow-md"
              />
            )}

            {/* Date */}
            <div className="mb-3 sm:mb-4">
              <label className="block text-gray-800 font-semibold mb-1">📅 Date</label>
              <input
                type="date"
                name="date"
                min={today}
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-orange-300 rounded-xl p-2.5 sm:p-3"
              />
            </div>

            {/* Time */}
            <div className="mb-3 sm:mb-4">
              <label className="block text-gray-800 font-semibold mb-1">⏰ Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full border border-orange-300 rounded-xl p-2.5 sm:p-3"
              />
            </div>

            {/* Guests */}
            <div className="mb-5 sm:mb-6">
              <label className="block text-gray-800 font-semibold mb-1">👥 Guests</label>
              <input
                type="number"
                name="guests"
                min="1"
                value={formData.guests}
                onChange={handleChange}
                className="w-full border border-orange-300 rounded-xl p-2.5 sm:p-3"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-3 sm:gap-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-orange-500 text-white font-semibold px-5 py-2 rounded-xl"
              >
                💾 Save
              </button>
              <button
                onClick={() => setEditingBooking(null)}
                className="flex-1 bg-gray-200 text-gray-800 font-semibold px-5 py-2 rounded-xl"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
