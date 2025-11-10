// src/components/products/ProductList.jsx
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  if (!products.length)
    return (
      <p className="text-center text-gray-400 mt-8">
        No products found for your search.
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}