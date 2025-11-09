// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-8xl font-extrabold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-base-content mb-2">
            Oops! Page Not Found
          </h2>
          <p className="text-base-content/70 mb-6">
            The page you’re looking for doesn’t exist or was moved.
            <br /> Let’s get you back home safely.
          </p>

          <div className="flex justify-center gap-3">
            <Link to="/" className="btn btn-primary">
              🏠 Go Home
            </Link>
            <Link to="/auth" className="btn btn-outline btn-accent">
              🔑 Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}