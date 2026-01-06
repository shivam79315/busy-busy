import { memo } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import LazyImage from "../LazyImage";

const ProductCard = memo(function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart
}) {
  const { title, price, image, category, inStock } = product;

  return (
    <Card className="glass-card border-border/50 group hover:shadow-glow transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-xl">
          <LazyImage 
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {!inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}

          <Button
            size="icon"
            variant="secondary"
            className="absolute cursor-pointer top-3 right-3 bg-gray-900 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
            onClick={onToggleWishlist}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isWishlisted ? "fill-primary text-primary" : "text-foreground"
              }`}
            />
          </Button>
        </div>

        <div className="p-4 space-y-3">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>

          <h3 className="font-semibold line-clamp-2">{title}</h3>

          <span className="text-2xl font-bold text-primary">
            ${price.toFixed(2)}
          </span>

          <Button
            className="w-full cursor-pointer"
            onClick={onAddToCart}
            disabled={!inStock}
          >
            <ShoppingCart className="w-4 h-4 font-bold mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

export default ProductCard;