import { ProductInStock, ProductOutOfStock } from "./index.styles";

const ProductStock = ({ children, stock, ...otherProps }) => {
  return stock ? (
    <>
      {children}
      <ProductInStock ProductInStock {...otherProps}>
        {stock} in stock
      </ProductInStock>
    </>
  ) : (
    <ProductOutOfStock {...otherProps}>Out of Stock</ProductOutOfStock>
  );
};

export default ProductStock;
