import React, { useState } from "react";
import ReactDOM from "react-dom"; // Import ReactDOM for Portals
import { ShoppingCart, Eye } from "lucide-react";
import { useAuthStore } from "../store/authStore.js";
import { useCartStore } from "../store/useCartStore.js";
import toast from "react-hot-toast";

function Cards({ item }) {
  const { user } = useAuthStore();
  const { addToCart } = useCartStore();
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {
      addToCart(item);
    }
  };

  const modalContent = showModal ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">{item.name}</h3>
        <p>
          <strong>Title:</strong> {item.title}
        </p>
        <p>
          <strong>Category:</strong> {item.category}
        </p>
        <p>
          <strong>Price:</strong> {item.price} Rs
        </p>
        <img src={item.image} alt="Book Cover" className="h-40 w-40 my-4" />
        <button
          className="mt-4 w-full rounded-lg bg-red-500 px-4 py-2 text-white font-medium hover:bg-red-600"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className="my-3 px-10 py-5">
        <div className="dark:bg-slate-800 card bg-base-200 shadow-xl hover:scale-105 duration-300">
          <figure>
            <img className="h-60 w-40" src={item.image} alt="Book Cover" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary border-green-500 bg-green-500">
                {item.category}
              </div>
            </h2>
            <div className="card-actions flex justify-between space-x-1 mt-4">
              {/* View Details Button */}
              <button
                className="flex items-center justify-center rounded-lg bg-blue-600 px-2 py-1 text-sm font-medium text-white hover:bg-blue-700"
                onClick={() => setShowModal(true)}
              >
                <Eye size={22} className="mr-2" />
                View Details
              </button>

              {/* Add to Cart Button */}
              <button
                className="flex items-center justify-center rounded-lg bg-emerald-600 px-2 py-1 text-sm font-medium text-white hover:bg-emerald-700"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={22} className="mr-2" />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render modal using React Portal to avoid clipping */}
      {ReactDOM.createPortal(modalContent, document.body)}
    </>
  );
}

export default Cards;

// import React from "react";
// import { ShoppingCart } from "lucide-react";
// import { useAuthStore } from "../store/authStore.js";
// import { useCartStore } from "../store/useCartStore.js";
// import toast from "react-hot-toast";

// function Cards({ item }) {
//   const { user } = useAuthStore();
//   const { addToCart } = useCartStore();
//   const handleAddToCart = () => {
//     if (!user) {
//       toast.error("Please login to add products to cart", { id: "login" });
//       return;
//     } else {
//       // add to cart
//       addToCart(item);
//     }
//   };
//   return (
//     <>
//       <div className="my-3 px-10 py-5 ">
//         <div className="  dark:bg-slate-800 card bg-base-200 shadow-xl hover:scale-105 duration-300">
//           <figure>
//             <img className="h-60 w-40" src={item.image} alt="Shoes" />
//           </figure>
//           <div className="card-body">
//             <h2 className="card-title">
//               {item.name}
//               <div className="badge badge-secondary border-green-500 bg-green-500">
//                 {item.category}
//               </div>
//             </h2>
//             <p>{item.title}</p>
//             <div className="card-actions justify-between">
//               <div className="badge badge-outline px-3 py-3 rounded-xl">
//                 {item.price} Rs
//               </div>
//               <div>
//                 <button
//                   className="flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium
// 					 text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
//                   onClick={handleAddToCart}
//                 >
//                   <ShoppingCart size={22} className="mr-2" />
//                   Add to cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Cards;
