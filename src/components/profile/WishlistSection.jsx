import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Heart, ShoppingCart, Trash2, Package } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';

// Mock wishlist data
const initialWishlist = [
  {
    id: 1,
    name: 'Wireless Headphones Pro',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljc3xlbnwwfHx8fDE3NjY5MDQxNTd8MA&ixlib=rb-4.1.0&q=85',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: 2,
    name: 'Premium Laptop Backpack',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxmYXNoaW9ufGVufDB8fHx8MTc2NjkwNDE2NHww&ixlib=rb-4.1.0&q=85',
    category: 'Fashion',
    inStock: true,
  },
  {
    id: 3,
    name: 'Noise Cancelling Earbuds',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxlbGVjdHJvbmljc3xlbnwwfHx8fDE3NjY5MDQxNTd8MA&ixlib=rb-4.1.0&q=85',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: 4,
    name: 'Designer Summer Collection',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHw0fHxmYXNoaW9ufGVufDB8fHx8MTc2NjkwNDE2NHww&ixlib=rb-4.1.0&q=85',
    category: 'Fashion',
    inStock: false,
  },
  {
    id: 5,
    name: 'Smart Watch Series 5',
    price: 399.99,
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: 6,
    name: 'Classic Leather Jacket',
    price: 249.99,
    image: 'https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg',
    category: 'Fashion',
    inStock: true,
  },
];

export const WishlistSection = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
    toast.success('Item removed from wishlist');
  };

  const addToCart = (item) => {
    if (!item.inStock) {
      toast.error('This item is currently out of stock');
      return;
    }
    toast.success(`${item.name} added to cart!`, {
      description: `Price: $${item.price.toFixed(2)}`,
    });
  };

  if (wishlist.length === 0) {
    return (
      <Card className="glass-card border-border/50">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="p-4 rounded-full bg-muted/50 mb-4">
            <Heart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Your wishlist is empty
          </h3>
          <p className="text-muted-foreground text-center mb-6">
            Start adding items you love to your wishlist
          </p>
          <Button className="bg-primary hover:bg-primary/90 shadow-glow">
            Browse Products
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            My Wishlist
          </h2>
          <p className="text-muted-foreground mt-1">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <Card key={item.id} className="glass-card border-border/50 group hover:shadow-glow transition-all duration-300">
            <CardContent className="p-0">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden rounded-t-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <Badge variant="destructive" className="text-sm">
                      Out of Stock
                    </Badge>
                  </div>
                )}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </Button>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs bg-muted/50">
                    {item.category}
                  </Badge>
                  <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-2xl font-bold text-primary" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 shadow-glow"
                    onClick={() => addToCart(item)}
                    disabled={!item.inStock}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="border-destructive/30 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State Placeholder for grid alignment */}
      {wishlist.length % 3 === 2 && (
        <div className="hidden lg:block" />
      )}
    </div>
  );
};

export default WishlistSection;