import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../../containers/CategoriesPreview";
import Category from "../../containers/Category";
import { useEffect } from "react";
import { fetchProductsByCategoriesStart } from "../../store/Categories/action";
import { useDispatch } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsByCategoriesStart());
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=":category" element={<Category />}></Route>
    </Routes>
  );
};
export default Shop;
