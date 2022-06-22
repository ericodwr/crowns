import React, { useState, useContext } from 'react';

// Stripe
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Context
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';

// Components
import Button from '../Button/Button';

const PaymentForm = () => {
  // State
  const [isProcessingPayment, SetisProcessingPayment] = useState(false);

  // Context
  const { cartTotal } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);

  // Stripe Hooks
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Loading
    SetisProcessingPayment(true);

    const response = await fetch(
      'http://localhost:8888/.netlify/functions/create-payment-intent',
      {
        method: 'post',
        headers: {
          'Content-Type': 'Application/json',
        },
        // JSON STRINGIFY PROBLEM
        body: { amount: cartTotal * 100 },
      },
    ).then((res) => res.json());
    console.log(response);
    const {
      paymentIntent: { client_secret },
    } = response;

    console.log(client_secret);

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'guest',
        },
      },
    });

    // Loading
    SetisProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error, 'error');
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('payment succesfull');
      }
    }
  };

  return (
    <div className="payment-form-container">
      <form className="form-container" onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <Button isLoading={isProcessingPayment} buttonType={'inverted'}>
          Pay Now
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
