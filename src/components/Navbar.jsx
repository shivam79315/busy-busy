// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../features/search/searchSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUserThunk } from "../features/auth/authThunks";
import { toast } from "sonner";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  // Scroll listener (optimized to prevent re-renders)
  useEffect(() => {
    const handleScroll = () => {
      const shouldFix = window.scrollY > 0;
      setIsScrolled((prev) => (prev !== shouldFix ? shouldFix : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  // Search Handler (global search state + navigate)
  const handleSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchTerm(value));
    if (value.trim().length > 0) navigate("/products");
  };

  const handleLogout = () => {
    try {
      dispatch(logoutUserThunk())
      .unwrap()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/auth");
      })
    } catch (err) {
      toast.error("Logged out successfully!");
    }
  }

  return (
    <>
      {/* Main Navbar */}
      <div
        className={`navbar top-0 left-0 w-full h-16 z-50 duration-300 ease-in-out ${
          isScrolled
            ? "fixed bg-neutral/80 backdrop-blur-md shadow-md"
            : "bg-transparent backdrop-blur-0 shadow-none"
        }`}
      >
        {/* Left Section */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            {/* Mobile Menus */}
            <ul
              tabIndex="-1"
              className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 p-2 shadow ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
            </ul>
          </div>

          {/* Brand / Logo */}
          <Link to="/" className="btn btn-ghost text-xl px-0 sm:px-4">
            <img
              src="logo.png"
              alt="Vastra"
              className="inline-block w-8 h-8 mr-2"
            />{" "}
            Vastra
          </Link>
        </div>

        {/* Desktop Menus */}
        <div className="navbar-center hidden lg:flex">
          <ul tabIndex="-1" className={`menu menu-horizontal px-1`}>
            <li className="font-bold">
              <Link to="/">Home</Link>
            </li>
            <li className="font-bold">
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="navbar-end flex gap-2">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearch}
            className="input input-bordered w-24 md:w-64 transition-all"
          />

          {/* Cart Dropdown */}
          <Link
            to="/cart"
            aria-label="Go to cart"
            className="btn btn-ghost btn-circle"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>

                <span className="badge badge-sm indicator-item">
                  8
                </span>
            </div>
          </Link>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  className="Tailwind CSS Navbar component"
                  src={
                    user?.profileImg || "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                  }
                  alt={user?.name ? `${user.name}'s profile photo` : "Default user avatar"}
                  onError={(e) => {
                    e.currentTarget.src = "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp";
                  }}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 p-2 shadow"
            >
              <li>
                {user && <p>Hello, {user.name}</p>}
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Spacer to prevent layout shift */}
      {isScrolled && <div className="h-16 w-full" />}
    </>
  );
}