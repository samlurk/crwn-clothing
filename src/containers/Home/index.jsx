import { useEffect } from "react";
import CategoryList from "../../components/Category/CategoryList";
import { fetchCategoriesAsync } from "../../store/Categories/action";
import {
  selectCategories,
  selectCategoryIsLoading,
} from "../../store/Categories/selector";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";

function Home() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoryIsLoading);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);

  return (
    <main>
      {isLoading ? <Spinner /> : <CategoryList categories={categories} />}
    </main>
  );
}

export default Home;
