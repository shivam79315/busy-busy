// src/components/cart/CartSummary.jsx
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function CartSummary({ items }) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Card className="border-border/40 bg-background/80 backdrop-blur">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Order Summary</h2>

        <Separator />

        <div className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <Separator />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <Button className="w-full cursor-pointer font-bold h-12 text-lg bg-primary hover:bg-primary/90">
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  );
}