require('dotenv').config();

const PUBLISHABLE_KEY = `${process.env.STRIPE_SECRET_KEY}`;

const stripe = require('stripe')(
  'sk_test_51L6adxI81pXDlBM7itUkDLemAtTUj2LLXHPI5rruN6vvFTyCpscEhNBGIGvIwIve214ACUZUPzJlMjXDkHEmWOQC00XRnNni7e',
);

exports.handler = async (event) => {
  let paymentIntent;
  const yaas = event.body;

  try {
    // JSON PARSE PROBLEM CORS
    // const sup = JSON.parse(event.body);

    console.log('event');
    paymentIntent = await stripe.paymentIntents.create({
      amount: 2000,
      currency: 'usd',
      payment_method_types: ['card'],
    });
  } catch (error) {
    console.log({ error });
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ paymentIntent, yaas }),
  };
};
