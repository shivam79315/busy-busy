import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserThunk, googleLoginThunk, loginUserThunk } from "../features/auth/authThunks";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (isSignup && !name.trim())
      return toast.error("Please enter valid data!");
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

  useEffect(() => {
    if (user) {
      toast.success(`Welcome ${user.name || "User"}!`);
      navigate("/");
    }
  }, [user]);

  const handleGoogleLogin = () => {
    dispatch(googleLoginThunk());
  };

  return (
    <>
      <div className="min-h-screen w-full bg-super-fiesta flex items-center justify-center">
        <div className="card lg:card-side bg-base-200 shadow-xl w-full max-w-5xl overflow-hidden">
          {/* Left section (Form) */}
          <div className="card-body w-full lg:w-1/2 flex flex-col justify-center p-8">
            <h2 className="text-3xl font-bold text-center text-primary mb-6">
              {isSignup ? "Create an Account" : "Welcome Back"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
              )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full mt-4"
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

            {/* OR Divider */}
            <div className="divider text-sm">OR</div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="btn w-full bg-red-500 hover:bg-red-600 text-white flex gap-2"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            {/* Toggle between Sign In / Sign Up */}
            <p className="text-center text-sm mt-4">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignup((prev) => !prev)}
                className="link link-primary font-medium"
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>

          {/* Right Section (Image / Visual) */}
          <div className="hidden lg:flex lg:w-1/2 bg-base-300 items-center justify-center relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60"
              alt="Login Illustration"
              className="object-cover w-full h-full opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-200/70 to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-base-content">
              <h3 className="text-2xl font-semibold">Welcome to BusyBuy 👋</h3>
              <p className="text-sm opacity-80">
                Shop smarter, faster, and safer with your personal account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
