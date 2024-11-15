import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { baseUrl } from "../url.js";

import Navbar from "../components/Navbar.jsx";
import Cards from "../components/Cards.jsx";
import Footer from "../components/Footer";

function Courses() {
  const [book, setBook] = useState([]); // Stores the book data
  const [category, setCategory] = useState("Paid"); // **Added state to store selected category**

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${baseUrl}/book`);
        setBook(
          res.data.filter((data) =>
            category === "All" ? true : data.category === category
          )
        ); // **Filters books based on selected category**
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, [category]); // **Added category as a dependency to re-fetch books on category change**

  return (
    <>
      <Navbar />

      <div>
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
          <h1 className="mt-3 font-semibold text-center text-2xl">
            Our Popular <span className="text-pink-500 font-bold">e-Books</span>
          </h1>
          <p className="mt-3">
            Find top-selling e-books in genres like thriller, romance, and
            science fiction. Explore e-books available only through our
            platform. Take advantage of discounts and promotions on selected
            e-books.
          </p>
          <div className="flex justify-center">
            <Link to="/">
              <button className="mt-3 px-2 py-1 hover:bg-pink-500 duration-300 hover:text-white bg-pink-300 text-black rounded-xl font-semibold">
                Back
              </button>
            </Link>
          </div>

          {/* **Added Dropdown for Category Selection** */}
          <div className="flex justify-center mt-5">
            <span className=" mt-2 font-medium text-center text-sm ">
              Select Category -
            </span>
            <select
              className=" mx-3 px-2 py-1 rounded-lg border-2  dark:bg-slate-800 border-gray-300"
              value={category}
              onChange={(e) => setCategory(e.target.value)} // **Updates category state based on user selection**
            >
              <option value="All">All</option>
              <option value="Paid">Paid</option>
              <option value="Free">Free</option>
            </select>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3">
          {book.map((item) => (
            <Cards item={item} key={item.id} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Courses;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// import { baseUrl } from "../url.js";

// import Navbar from "../components/Navbar.jsx";
// import Cards from "../components/Cards.jsx";
// import Footer from "../components/Footer";

// function courses() {
//   // console.log(list)
//   const [book, setbook] = useState([]);
//   useEffect(() => {
//     const getBook = async () => {
//       try {
//         const res = await axios.get(`${baseUrl}/book`);
//         //console.log(res.data)
//         setbook(res.data.filter((data) => data.category !== "Free"));
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getBook();
//   }, []);

//   return (
//     <>
//       <Navbar />

//       <div>
//         <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
//           <h1 className="mt-3 font-semibold text-center text-2xl">
//             Our Popular <span className="text-pink-500 font-bold">e-Books</span>
//           </h1>
//           <p className="mt-3">
//             Find top-selling e-books in genres like thriller, romance, and
//             science fiction. Explore e-books available only through our
//             platform. Take advantage of discounts and promotions on selected
//             e-books.
//           </p>
//           <div className="flex justify-center">
//             <Link to="/">
//               <button className=" mt-3 px-2 py-1 hover:bg-pink-500 duration-300 hover:text-white bg-pink-300 text-black rounded-xl font-semibold">
//                 Back
//               </button>
//             </Link>
//           </div>
//         </div>
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-3">
//           {book.map((item) => (
//             <Cards item={item} key={item.id} />
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default courses;
