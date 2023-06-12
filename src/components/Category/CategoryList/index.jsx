import CategoryCard from "../CategoryCard";
import { CategoryListContainer } from "./index.styles";

const CategoryList = ({ categories }) => (
  <CategoryListContainer>
    {categories.map((category, index) => {
      return <CategoryCard category={category} key={index} />;
    })}
  </CategoryListContainer>
);

export default CategoryList;
