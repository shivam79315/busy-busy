// src/components/products/ProductList.jsx
import ProductCardContainer from "./ProductCardContainer";

export default function ProductList({ products }) {
  if (!products.length)
    return (
      <p className="text-center text-gray-400 mt-8">
        No products found for your search.
      </p>
    );

  return (
    <div className="
      grid 
      grid-cols-1
      xs:grid-cols-2
      sm:grid-cols-2
      lg:grid-cols-3 
      xl:grid-cols-4 
      gap-2
      sm:gap-4
      sm:gap-6 
      lg:gap-8 
      xl:gap-10
      place-items-center sm:place-items-stretch
    ">
      {products.map((p) => (
        <ProductCardContainer key={p.id} product={p} />
      ))}
    </div>
  );
}