export async function createCheckoutSession(items) {
  const response = await fetch(
    "https://busy-busy-backend.vercel.app/api/create-checkout-session",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create checkout session");
  }

  return response.json();
}