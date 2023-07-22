import CartItem from "../CartItem";
import { CartDropdownContainer, CartItems, EmptyMessage } from "./index.styles";
import { useNavigate } from "react-router-dom";
import Button from "../../Button";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../../store/Cart/selector";
import { useCart } from "../../../hooks/Auth/useCart";

const CartDropdown = () => {
  const [cartRef] = useCart();
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer ref={cartRef}>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => (
            <CartItem key={item.product.id} cartItem={item} />
          ))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
        {}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
