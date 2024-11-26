import React, { useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

import Home from "./home/Home";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Contact from "./components/Contact";
import MyCart from "./cart/Cart";
import About from "./components/About";
import LoadingSpinner from "./components/LoadingSpinner";
import { useAuthStore } from "./store/authStore";
import { useCartStore } from "./store/useCartStore";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};
// protect routes that require admin access
const CheckAdmin = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const { role } = useAuthStore();

  if (!isAuthenticated || role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [authUser, setAuthuser] = useAuth();
  const { getCartItems } = useCartStore();
  //console.log(authUser);

  const { user, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;

    getCartItems();
  }, [getCartItems, user]);

  if (isCheckingAuth) return <LoadingSpinner />;
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-gray-200">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={
              <ProtectedRoute>
                {" "}
                <Courses />
              </ProtectedRoute>
            } // authUser ? <Courses /> : <Navigate to="/signup" />
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/Dashboard"
            element={
              <CheckAdmin>
                <Dashboard />
              </CheckAdmin>
            }
          />
          <Route
            path="/MyCart"
            element={authUser ? <MyCart /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
