// import React, { useState } from "react";

// export default function Menu() {
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [bookingDetails, setBookingDetails] = useState({
//     date: "",
//     time: "",
//     guests: 1,
//   });

//   const items = [
//     {
//       id: 1,
//       name: "Pancakes",
//       price: 120,
//       desc: "Soft and fluffy served with maple syrup.",
//       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE6oMZH9pV1Pgl9HhgYQwBy5uW1udg4P-pLg&s",
//     },
//     {
//       id: 2,
//       name: "Masala Dosa",
//       price: 90,
//       desc: "Crispy dosa with spicy potato filling.",
//       img: "https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__1200_0_0_0_auto.jpg",
//     },
//     {
//       id: 3,
//       name: "Omelette",
//       price: 70,
//       desc: "Classic egg omelette with herbs.",
//       img: "https://www.sweetashoney.co/wp-content/uploads/Omelette-2.jpg",
//     },
//     {
//       id: 4,
//       name: "Idli & Vada Combo",
//       price: 80,
//       desc: "Steamed idlis with crispy vadas and chutney.",
//       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgA8Z0seE1u1E7ZvVM9Y1nrmEt1dAd3LZCYg&s",
//     },
//     {
//       id: 5,
//       name: "Fruit Bowl",
//       price: 100,
//       desc: "Fresh seasonal fruits for a healthy start.",
//       img: "https://www.spendwithpennies.com/wp-content/uploads/2019/04/Fruit-Salad-SWP.jpg",
//     },
//     {
//       id: 6,
//       name: "Coffee",
//       price: 60,
//       desc: "Hot and energizing South Indian coffee.",
//       img: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg",
//     },
//   ];

//   const handleAddToBooking = (item) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       alert("Please log in first!");
//       return;
//     }
//     setSelectedItem(item);
//     setBookingDetails({
//       date: "",
//       time: "",
//       guests: 1,
//     });
//   };

//   const handleConfirmBooking = async () => {
//     if (!bookingDetails.date || !bookingDetails.time) {
//       alert("Please select date and time!");
//       return;
//     }

//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       alert("Please log in first!");
//       return;
//     }

//     const bookingData = {
//       user: user.id,
//       name: selectedItem.name,
//       desc: selectedItem.desc,
//       price: selectedItem.price,
//       img: selectedItem.img,
//       date: bookingDetails.date,
//       time: bookingDetails.time,
//       guests: bookingDetails.guests,
//     };

//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/bookings/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bookingData),
//       });

//       if (res.ok) {
//         alert(`✅ ${selectedItem.name} booked successfully!`);
//         setSelectedItem(null);
//         setBookingDetails({ date: "", time: "", guests: 1 });
//       } else {
//         alert("Failed to book item. Please try again.");
//       }
//     } catch (err) {
//       console.error("Error booking:", err);
//       alert("Error booking item!");
//     }
//   };

//   const handleTimeFocus = () => {
//     if (!bookingDetails.time) {
//       const now = new Date();
//       const hours = String(now.getHours()).padStart(2, "0");
//       const minutes = String(now.getMinutes()).padStart(2, "0");
//       setBookingDetails((prev) => ({
//         ...prev,
//         time: `${hours}:${minutes}`,
//       }));
//     }
//   };

//   const today = new Date().toISOString().split("T")[0];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 py-10 px-4">
//       <h1 className="text-4xl font-bold text-center text-orange-700 mb-2 drop-shadow-sm">
//         🍳 Our Breakfast Menu
//       </h1>
//       <p className="text-center text-gray-600 mb-10">
//         Choose your favorite and add it to your booking!
//       </p>

//       {/* Menu Grid */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//         {items.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 hover:-translate-y-1"
//           >
//             <img
//               src={item.img}
//               alt={item.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 {item.name}
//               </h3>
//               <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
//               <div className="flex justify-between items-center mt-3">
//                 <span className="text-orange-600 font-semibold">
//                   ₹{item.price}
//                 </span>
//                 <button
//                   onClick={() => handleAddToBooking(item)}
//                   className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition"
//                 >
//                   🕒 Book Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Popup Modal */}
//       {selectedItem && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white/95 shadow-2xl rounded-3xl p-6 sm:p-8 w-80 sm:w-96 border border-orange-300 relative animate-[pop_0.3s_ease-out]">
//             <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-orange-600 mb-3 sm:mb-4 drop-shadow-sm">
//               🍽️ Book {selectedItem.name}
//             </h2>
//             <img
//               src={selectedItem.img}
//               alt={selectedItem.name}
//               className="w-full h-32 sm:h-40 object-cover rounded-xl mb-3 sm:mb-4 shadow-md border border-orange-100"
//             />
//             <p className="text-center text-gray-700 mb-4 sm:mb-6 italic text-sm">
//               “{selectedItem.desc}”
//             </p>

//             {/* Date */}
//             <div className="mb-3 sm:mb-4">
//               <label className="block text-gray-800 font-semibold mb-1 text-sm sm:text-base">
//                 📅 Date
//               </label>
//               <input
//                 type="date"
//                 min={today}
//                 className="w-full border border-orange-300 rounded-xl p-2 sm:p-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition bg-white"
//                 value={bookingDetails.date}
//                 onChange={(e) =>
//                   setBookingDetails({
//                     ...bookingDetails,
//                     date: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             {/* Time */}
//             <div className="mb-3 sm:mb-4">
//               <label className="block text-gray-800 font-semibold mb-1 text-sm sm:text-base">
//                 ⏰ Time
//               </label>
//               <input
//                 type="time"
//                 className="w-full border border-orange-300 rounded-xl p-2 sm:p-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition bg-white"
//                 value={bookingDetails.time}
//                 onFocus={handleTimeFocus}
//                 onChange={(e) =>
//                   setBookingDetails({
//                     ...bookingDetails,
//                     time: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             {/* Guests */}
//             <div className="mb-5 sm:mb-6">
//               <label className="block text-gray-800 font-semibold mb-1 text-sm sm:text-base">
//                 👥 Guests
//               </label>
//               <input
//                 type="number"
//                 min="1"
//                 className="w-full border border-orange-300 rounded-xl p-2 sm:p-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition bg-white"
//                 value={bookingDetails.guests}
//                 onChange={(e) =>
//                   setBookingDetails({
//                     ...bookingDetails,
//                     guests: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-3 sm:mt-6">
//               <button
//                 onClick={handleConfirmBooking}
//                 className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold px-5 py-2 sm:py-2.5 rounded-xl shadow-lg hover:shadow-orange-400/50 hover:scale-105 transition-transform duration-200"
//               >
//                 ✅ Confirm
//               </button>
//               <button
//                 onClick={() => setSelectedItem(null)}
//                 className="flex-1 bg-gray-100 text-gray-800 font-semibold px-5 py-2 sm:py-2.5 rounded-xl shadow hover:bg-gray-200 hover:scale-105 transition-transform duration-200"
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




import React, { useState } from "react";

export default function Menu() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    time: "",
    guests: 1,
  });

  const items = [
    {
      id: 1,
      name: "Pancakes",
      price: 120,
      desc: "Soft and fluffy served with maple syrup.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE6oMZH9pV1Pgl9HhgYQwBy5uW1udg4P-pLg&s",
    },
    {
      id: 2,
      name: "Masala Dosa",
      price: 90,
      desc: "Crispy dosa with spicy potato filling.",
      img: "https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__1200_0_0_0_auto.jpg",
    },
    {
      id: 3,
      name: "Omelette",
      price: 70,
      desc: "Classic egg omelette with herbs.",
      img: "https://www.sweetashoney.co/wp-content/uploads/Omelette-2.jpg",
    },
    {
      id: 4,
      name: "Idli & Vada Combo",
      price: 80,
      desc: "Steamed idlis with crispy vadas and chutney.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgA8Z0seE1u1E7ZvVM9Y1nrmEt1dAd3LZCYg&s",
    },
    {
      id: 5,
      name: "Fruit Bowl",
      price: 100,
      desc: "Fresh seasonal fruits for a healthy start.",
      img: "https://www.spendwithpennies.com/wp-content/uploads/2019/04/Fruit-Salad-SWP.jpg",
    },
    {
      id: 6,
      name: "Coffee",
      price: 60,
      desc: "Hot and energizing South Indian coffee.",
      img: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg",
    },
  ];

  const handleAddToBooking = (item) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in first!");
      return;
    }
    setSelectedItem(item);
    setBookingDetails({
      date: "",
      time: "",
      guests: 1,
    });
  };

  const handleConfirmBooking = async () => {
    if (!bookingDetails.date || !bookingDetails.time) {
      alert("Please select date and time!");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in first!");
      return;
    }

    const bookingData = {
      user: user.id,
      name: selectedItem.name,
      desc: selectedItem.desc,
      price: selectedItem.price,
      img: selectedItem.img,
      date: bookingDetails.date,
      time: bookingDetails.time,
      guests: bookingDetails.guests,
    };

    try {
      const res = await fetch(
        "https://breakfast-backend-lpm3.onrender.com/api/bookings/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      if (res.ok) {
        alert(`✅ ${selectedItem.name} booked successfully!`);
        setSelectedItem(null);
        setBookingDetails({ date: "", time: "", guests: 1 });
      } else {
        alert("Failed to book item. Please try again.");
      }
    } catch (err) {
      console.error("Error booking:", err);
      alert("Error booking item!");
    }
  };

  const handleTimeFocus = () => {
    if (!bookingDetails.time) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setBookingDetails((prev) => ({
        ...prev,
        time: `${hours}:${minutes}`,
      }));
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-orange-700 mb-2 drop-shadow-sm">
        🍳 Our Breakfast Menu
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Choose your favorite and add it to your booking!
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 hover:-translate-y-1"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-orange-600 font-semibold">
                  ₹{item.price}
                </span>
                <button
                  onClick={() => handleAddToBooking(item)}
                  className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition"
                >
                  🕒 Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 shadow-2xl rounded-3xl p-6 sm:p-8 w-80 sm:w-96 border border-orange-300 relative animate-[pop_0.3s_ease-out]">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-orange-600 mb-3 sm:mb-4 drop-shadow-sm">
              🍽️ Book {selectedItem.name}
            </h2>
            <img
              src={selectedItem.img}
              alt={selectedItem.name}
              className="w-full h-32 sm:h-40 object-cover rounded-xl mb-3 sm:mb-4 shadow-md border border-orange-100"
            />
            <p className="text-center text-gray-700 mb-4 sm:mb-6 italic text-sm">
              “{selectedItem.desc}”
            </p>

            <div className="mb-3 sm:mb-4">
              <label className="block text-gray-800 font-semibold mb-1 text-sm sm:text-base">
                📅 Date
              </label>
              <input
                type="date"
                min={today}
                className="w-full border border-orange-300 rounded-xl p-2 sm:p-3 text-gray-900"
                value={bookingDetails.date}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, date: e.target.value })
                }
              />
            </div>

            <div className="mb-3 sm:mb-4">
              <label className="block text-gray-800 font-semibold mb-1 text-sm sm:text-base">
                ⏰ Time
              </label>
              <input
                type="time"
                className="w-full border border-orange-300 rounded-xl p-2 sm:p-3 text-gray-900"
                value={bookingDetails.time}
                onFocus={handleTimeFocus}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, time: e.target.value })
                }
              />
            </div>

            <div className="mb-5 sm:mb-6">
              <label className="block text-gray-800 font-semibold mb-1 text-sm sm:text-base">
                👥 Guests
              </label>
              <input
                type="number"
                min="1"
                className="w-full border border-orange-300 rounded-xl p-2 sm:p-3 text-gray-900"
                value={bookingDetails.guests}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    guests: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-3 sm:mt-6">
              <button
                onClick={handleConfirmBooking}
                className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold px-5 py-2 sm:py-2.5 rounded-xl shadow-lg hover:scale-105 transition"
              >
                ✅ Confirm
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="flex-1 bg-gray-100 text-gray-800 font-semibold px-5 py-2 sm:py-2.5 rounded-xl shadow hover:bg-gray-200 hover:scale-105 transition"
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




