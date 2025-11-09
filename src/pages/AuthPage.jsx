// src/pages/AuthPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserThunk, loginUserThunk } from "../features/auth/authThunks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../api/firebase";
import ClipLoader from "react-spinners/ClipLoader";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (isSignup && !name.trim()) return toast.error("Please enter valid data!");
    if (!email.trim() || password.length < 6)
      return toast.error("Please enter valid data!");

    if (isSignup) {
      dispatch(createUserThunk({ name, email, password }))
        .unwrap()
        .then(() => {
          toast.success("Account created successfully!");
          navigate("/");
        })
        .catch((err) => toast.error(err));
    } else {
      dispatch(loginUserThunk({ email, password }))
        .unwrap()
        .then(() => {
          toast.success("Signed in successfully!");
          navigate("/");
        })
        .catch((err) => toast.error(err));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Welcome ${user.displayName || "User"}!`);
      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Google Sign-In failed. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isSignup ? "Sign Up" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password (min 6 chars)"
            value={formData.password}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? (
              <ClipLoader color="#fff" size={20} />
            ) : isSignup ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="flex flex-col items-center mt-4">
          <p className="text-gray-500 mb-2 text-sm">or</p>
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="flex items-center justify-center w-full gap-2 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignup((prev) => !prev)}
            className="text-blue-600 hover:underline font-medium"
          >
            {isSignup ? "Sign In instead" : "Sign Up instead"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;