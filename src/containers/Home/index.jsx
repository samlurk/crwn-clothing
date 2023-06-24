import { useEffect } from "react";
import CategoryList from "../../components/Category/CategoryList";
import { fetchCategories } from "../../store/Categories/reducer";
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
    dispatch(fetchCategories());
  }, []);

  return (
    <main>
      {isLoading ? <Spinner /> : <CategoryList categories={categories} />}
    </main>
  );
}

export default Home;
