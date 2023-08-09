import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_CLASSES } from "../Button/index";
import {
  PaymentButton,
  PaymentFormContainer,
  FormContainer,
} from "./index.styles";
import httpService from "../../services/Http";
import { selectToken } from "../../store/Auth/selector";
import { useDispatch, useSelector } from "react-redux";
import { clearAllItemsFromCart } from "../../store/Cart/reducer";
import { selectCurrentUser } from "../../store/User/selector";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    const cardElement = elements.getElement(CardElement);
    try {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: `${currentUser.displayName}`,
      });
      const { message } = await httpService.post(
        `order`,
        { paymentId: paymentMethod.id, provider: "Stripe" },
        token
      );
      dispatch(clearAllItemsFromCart());
      alert(message);
    } catch (error) {
      alert(error.message);
    }
    setIsProcessingPayment(false);
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
