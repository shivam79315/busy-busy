import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <div className="hero bg-super-grad min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold">Discover Your Style</h1>

            <p className="py-6">
              Explore the latest trends in fashion with premium-quality clothing
              for every occasion. From everyday essentials to statement pieces,
              find styles that fit your comfort, confidence, and lifestyle.
            </p>

            <Link to="/products">
              <button className="btn btn-primary">Shop the Collection</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
