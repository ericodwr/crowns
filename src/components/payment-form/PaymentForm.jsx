import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

// redux
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCartTotal } from '../../store/cart/cart.selector';

import './payment-form.styles.css';
import PaymentButton from '../payment-button/PaymentButton';
import { useNavigate } from 'react-router-dom';

export const PaymentForm = () => {
  // state
  const [processingPayment, setProcessingPayment] = useState(false);

  // router
  const navigate = useNavigate();

  // stripe
  const stripe = useStripe();
  const elements = useElements();

  // redux
  const user = useSelector(selectCurrentUser);
  const amount = useSelector(selectCartTotal);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user ? user.displayName : 'Guest',
        },
      },
    });

    setProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status == 'succeeded') {
        alert('Payment Successful');
        navigate('/');
      }
    }
  };

  return (
    <div className="payment-form-container">
      <form className="payment-form" onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton isLoading={processingPayment} buttonType={'inverted'}>
          Pay Now
        </PaymentButton>
      </form>
    </div>
  );
};

export default PaymentForm;
