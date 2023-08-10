import styled from "styled-components";
export const ProductStockContainer = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 10px;
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const ProductOutOfStock = styled(ProductStockContainer)`
  background: #c70039;
`;

export const ProductInStock = styled(ProductStockContainer)`
  background: #50c878;
`;
