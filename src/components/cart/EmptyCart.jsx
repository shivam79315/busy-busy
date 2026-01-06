// src/components/cart/EmptyCart.jsx
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="border-border/40 bg-background/80 backdrop-blur">
        <CardContent className="flex flex-col items-center gap-4 py-16 px-10">
          <ShoppingCart className="w-14 h-14 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <Button className="font-black" onClick={() => navigate("/products")}>
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}