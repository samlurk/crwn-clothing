import CategoryPreview from "../../components/Category/CategoryPreview";
import { useSelector } from "react-redux";
import {
  selectCategoryIsLoading,
  selectProductsByCategoriesMap,
} from "../../store/Categories/selector";
import Spinner from "../../components/Spinner";

const CategoriesPreview = () => {
  const productsByCategories = useSelector(selectProductsByCategoriesMap);
  const isLoading = useSelector(selectCategoryIsLoading);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.entries(productsByCategories).map(([title, products], index) => (
          <CategoryPreview key={index} title={title} products={products} />
        ))
      )}
    </>
  );
};
export default CategoriesPreview;
