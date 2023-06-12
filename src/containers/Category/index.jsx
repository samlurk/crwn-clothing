import { useParams } from "react-router-dom";
import { CategoryContainer, Title } from "./index.styles";
import ProductCard from "../../components/ProductCard";
import {
  selectProductsByCategoriesMap,
  selectCategoryIsLoading,
} from "../../store/Categories/selector";
import { useSelector } from "react-redux";
import { upperFirstLetter } from "../../utils/String";
import Spinner from "../../components/Spinner";

const Category = () => {
  const { category } = useParams();
  const productsByCategories = useSelector(selectProductsByCategoriesMap);
  const isLoading = useSelector(selectCategoryIsLoading);
  const products = productsByCategories[category.toLocaleLowerCase()];
  return (
    <>
      <Title>{upperFirstLetter(category)}</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </>
  );
};

export default Category;
