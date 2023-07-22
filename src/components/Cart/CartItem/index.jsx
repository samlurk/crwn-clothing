import {
  CartItemContainer,
  CartItemImg,
  CartItemDetails,
} from "./index.styles";

const CartItem = ({ cartItem }) => {
  const {
    product: { title, imageUrl, price },
    quantity,
  } = cartItem;
  return (
    <CartItemContainer>
      <CartItemImg src={imageUrl} alt={`${title}`} />
      <CartItemDetails>
        <span>{title}</span>
        <span>
          {quantity} * ${price}
        </span>
      </CartItemDetails>
    </CartItemContainer>
  );
};
export default CartItem;
