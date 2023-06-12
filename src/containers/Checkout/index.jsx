import { CheckoutContainer, Header, Block, Total } from "./index.styles";
import CheckoutItem from "../../components/CheckoutItem";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../store/Cart/selector";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <CheckoutContainer>
      <Header>
        <Block>
          <span>Product</span>
        </Block>
        <Block>
          <span>Description</span>
        </Block>
        <Block>
          <span>Quantity</span>
        </Block>
        <Block>
          <span>Price</span>
        </Block>
        <Block>
          <span>Remove</span>
        </Block>
      </Header>
      {cartItems.map((item) => (
        <CheckoutItem cartItem={item} key={item.title} />
      ))}
      <Total>${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
