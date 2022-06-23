require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
