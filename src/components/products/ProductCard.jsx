// src/components/products/ProductCard.jsx
export default function ProductCard({ product }) {
  return (
    <div className="card w-64 bg-base-100 shadow-md hover:shadow-xl transition-all">
      <figure className="h-48 bg-white p-4">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-full w-full"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-sm line-clamp-2">{product.title}</h2>
        <p className="text-lg font-semibold text-primary">${product.price}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-sm btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}