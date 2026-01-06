// src/components/cart/CartItem.jsx
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartThunk,
  decrementCartThunk,
  removeFromCartThunk,
} from "../../features/cart/cartThunks";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const increment = () => {
    dispatch(addToCartThunk({ uid: user.uid, product: item }));
  };

  const decrement = () => {
    dispatch(
      decrementCartThunk({
        uid: user.uid,
        productId: item.id,
      })
    );
  };

  const remove = () =>
    dispatch(removeFromCartThunk({ uid: user.uid, productId: item.id }));

  return (
    <Card className="border-border/40 bg-background/80 backdrop-blur">
      <CardContent className="flex gap-4 p-4 items-center">
        <img
          src={item.image}
          alt={item.title}
          className="w-24 h-24 rounded-xl object-cover"
        />

        <div className="flex-1 space-y-2">
          <h3 className="font-semibold leading-tight line-clamp-2">
            {item.title}
          </h3>

          <Badge variant="outline">${item.price.toFixed(2)}</Badge>

          <div className="flex items-center gap-2 mt-2">
            <Button className="cursor-pointer" size="icon" variant="outline" onClick={decrement}>
                <Minus className="w-4 h-4" />
            </Button>

            <span className="font-semibold">{item.quantity}</span>

            <Button className="cursor-pointer" size="icon" variant="outline" onClick={increment}>
                <Plus className="w-4 h-4" />
            </Button>

            <Button className="cursor-pointer" size="icon" variant="outline" onClick={remove}>
                <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
            </div>

        </div>

        <div className="text-lg font-bold">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
      </CardContent>
    </Card>
  );
}
