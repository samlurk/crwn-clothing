import { BUTTON_TYPE_CLASSES } from "../Button";
import {
  ProductContainer,
  Image,
  ProductButton,
  Footer,
  Title,
  Price,
} from "./index.styles";
import { addItemToCart } from "../../store/Cart/action";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/Cart/selector";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { title, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductContainer>
      <Image src={imageUrl} alt={`${title}`} />
      <Footer>
        <Title>{title}</Title>
        <Price>${price}</Price>
      </Footer>
      <ProductButton
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </ProductButton>
    </ProductContainer>
  );
};

export default ProductCard;
