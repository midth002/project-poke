import React from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "./PaymentForm"

const PUBLC_KEY = "pk_test_51L5wxnIUbbOnp5z2l7PhSBC3MWw1aP4QAJdPWDNUFZMNymn6UtHb34jKjHUC3TL6nNwuaqCMz7YsY432npnc5gac00fvvR7bma"
const stripeTestPromise = loadStripe(PUBLC_KEY)

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
        <PaymentForm />
    </Elements>
  )
} 
