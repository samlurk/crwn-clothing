import {
  Arrow,
  CheckoutItemContainer,
  Image,
  ImageContainer,
  Quantity,
  Value,
  RemoveButton,
} from "./index.styles";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemToCart,
} from "../../store/Cart/reducer";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/Cart/selector";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { id, title, imageUrl, price, quantity } = cartItem;

  const addItemHandler = () => dispatch(addItemToCart(cartItem));
  const removeItemHandler = () => dispatch(removeItemToCart(cartItem));
  const clearItemHandler = () => dispatch(clearItemFromCart(id));
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <Image src={imageUrl} alt={`${title}`} />
      </ImageContainer>
      <span>{title}</span>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <span>{price}</span>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
