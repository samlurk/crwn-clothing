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
  addItemToCartStart,
  clearItemFromCart,
  clearItemFromCartStart,
  removeItemToCart,
  removeItemToCartStart,
} from "../../store/Cart/reducer";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../store/Auth/selector";

const CheckoutItem = ({ cartItem }) => {
  const isAuthenticated = useSelector(selectToken);
  const dispatch = useDispatch();
  const { product, quantity } = cartItem;
  const { id, title, imageUrl, price, inventory } = product;
  const addItemHandler = () =>
    dispatch(isAuthenticated ? addItemToCartStart(id) : addItemToCart(product));
  const removeItemHandler = () =>
    dispatch(
      isAuthenticated ? removeItemToCartStart(id) : removeItemToCart(product)
    );
  const clearItemHandler = () =>
    dispatch(
      isAuthenticated ? clearItemFromCartStart(id) : clearItemFromCart(id)
    );

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <Image src={imageUrl} alt={`${title}`} />
      </ImageContainer>
      <span>{title}</span>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        {inventory - quantity > 0 && (
          <Arrow onClick={addItemHandler}>&#10095;</Arrow>
        )}
      </Quantity>
      <span>{price}</span>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
