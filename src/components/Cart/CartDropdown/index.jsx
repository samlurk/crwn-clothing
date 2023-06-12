import CartItem from "../CartItem";
import { CartDropdownContainer, CartItems, EmptyMessage } from "./index.styles";
import { useNavigate } from "react-router-dom";
import Button from "../../Button";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../../store/Cart/selector";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.title} cartItem={item} />)
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
