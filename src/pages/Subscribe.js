import React from 'react';
import { useAuth } from '../components/AuthProvider';
import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from '../api';

// Initialize Stripe outside the component to avoid recreating on each render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '');

const Subscribe = () => {
  const { user } = useAuth();

  const handleSubscribe = async () => {
    if (!user) {
      alert('Please login to subscribe.');
      return;
    }
    const stripe = await stripePromise;
    try {
      const sessionId = await createCheckoutSession({
        priceId: process.env.REACT_APP_STRIPE_PRICE_ID,
        successUrl: window.location.origin + '/subscribe/success',
        cancelUrl: window.location.origin + '/subscribe/cancel',
        customerEmail: user.email,
      });
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Subscription</h2>
      <p>
        Subscribe to gain access to premium content. Your subscription will automatically renew until
        cancelled.
      </p>
      <button onClick={handleSubscribe}>Subscribe Now</button>
    </div>
  );
};

export default Subscribe;
