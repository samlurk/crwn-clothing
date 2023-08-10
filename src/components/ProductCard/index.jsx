import { BUTTON_TYPE_CLASSES } from "../Button";
import {
  ProductContainer,
  Image,
  ProductButton,
  Footer,
  Title,
  Price,
} from "./index.styles";
import { addItemToCart, addItemToCartStart } from "../../store/Cart/reducer";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../store/Auth/selector";
import ProductStock from "../ProductStock";

const ProductCard = ({ product }) => {
  const isAuthenticated = useSelector(selectToken);
  const dispatch = useDispatch();
  const { id, title, price, imageUrl, inventory } = product;

  const addProductToCart = () =>
    dispatch(isAuthenticated ? addItemToCartStart(id) : addItemToCart(product));

  return (
    <ProductContainer>
      <Image src={imageUrl} alt={`${title}`} />
      <Footer>
        <Title>{title}</Title>
        <Price>${price}</Price>
      </Footer>
      <ProductStock stock={inventory}>
        <ProductButton
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          onClick={addProductToCart}
        >
          Add to card
        </ProductButton>
      </ProductStock>
    </ProductContainer>
  );
};

export default ProductCard;
