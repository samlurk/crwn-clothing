import styled from "styled-components";

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;

  & > :not(:last-child) {
    width: 23%;
  }
`;

export const ImageContainer = styled.div`
  padding-right: 15px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const Quantity = styled.span`
  display: flex;
`;

export const Arrow = styled.div`
  cursor: pointer;
`;

export const Value = styled.span`
  margin: 0 10px;
`;

export const RemoveButton = styled.span`
  padding-left: 12px;
  cursor: pointer;
`;
