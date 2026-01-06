// src/pages/CartPage.jsx
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";
import { useEffect } from "react";
import { fetchCartThunk } from "../features/cart/cartThunks";
import Loader from "../components/products/Loader";

export default function CartPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    if(user) {
        dispatch(fetchCartThunk(user.uid));
    }
  }, [user, dispatch]);

  if(loading) return <Loader />;

  if (!items.length) return <EmptyCart />;

  return (
    <div className="w-full h-screen px-4 lg:px-10 py-6">
      <div className="flex flex-col lg:flex-row h-full gap-6">

        {/* Cart Items */}
        <div className="lg:w-[60%] h-full overflow-hidden">
          <div className="h-full py-4 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-[40%] h-full">
          <div className="sticky top-6">
            <CartSummary items={items} />
          </div>
        </div>

      </div>
    </div>
  );
}