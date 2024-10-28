import React from "react";
import { ShoppingCart } from "lucide-react";
import { useAuthStore } from "../store/authStore.js";
import { useCartStore } from "../store/useCartStore.js";
import toast from "react-hot-toast";

function Cards({ item }) {
  const { user } = useAuthStore();
  const { addToCart } = useCartStore();
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {
      // add to cart
      addToCart(item);
    }
  };
  return (
    <>
      <div className="my-3 px-10 py-5 ">
        <div className="  dark:bg-slate-800 card bg-base-200 shadow-xl hover:scale-105 duration-300">
          <figure>
            <img className="h-60 w-40" src={item.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary border-green-500 bg-green-500">
                {item.category}
              </div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline px-3 py-3 rounded-xl">
                {item.price} Rs
              </div>
              <div>
                <button
                  className="flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium
					 text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={22} className="mr-2" />
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
