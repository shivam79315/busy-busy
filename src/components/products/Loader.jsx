// src/components/products/Loader.jsx
import ClipLoader from "react-spinners/ClipLoader";

export default function Loader() {
  return (
    <div className="flex justify-center items-center py-20">
      <ClipLoader color="#4CAF50" size={40} />
    </div>
  );
}
