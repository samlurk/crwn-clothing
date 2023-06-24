import { BUTTON_TYPE_CLASSES } from "../Button";
import {
  ProductContainer,
  Image,
  ProductButton,
  Footer,
  Title,
  Price,
} from "./index.styles";
import { addItemToCart } from "../../store/Cart/reducer";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { title, price, imageUrl } = product;
  const addProductToCart = () => dispatch(addItemToCart(product));

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
