import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ProductCard from "./ProductCard";
import { toggleWishlistThunk } from "../../features/wishlist/wishlistThunks";
import { addToCartThunk } from "../../features/cart/cartThunks";

export default function ProductCardContainer({product}) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const wishlistIds = useSelector((state) => state.wishlist.ids);
    const isWishlisted = wishlistIds.includes(product.id);

    const onToggleWishlist = () => {
        if(!user) {
            toast.error('Please login to use Wishlist!');
            return ;
        }

        dispatch(toggleWishlistThunk({
                uid: user.uid,
                product,
            })
        );

        toast.success('Product added to Wishlist!');
    }

    const onAddToCart = () => {
        if(!user) {
            toast.error('Please login to use Cart!');
            return ;
        }

        if (!product.inStock) {
            toast.error("This item is currently out of stock");
            return;
        }

        dispatch(
            addToCartThunk({
                uid: user.uid,
                product,
            })
        )

        toast.success('Product added to Cart!');
    }


    return (
        <>
            <ProductCard
                product={product}
                isWishlisted={isWishlisted}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
            />
        </>
    )
}