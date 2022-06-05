import React, {useState} from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios";
import "../Stripe/Stripe.css"
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Times New Roman",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color:"#87bbfd"},
            "::placeholder": { color: "#fce883"}
        },
        invalid: {
            iconColor: "#FF0000",
            color: "#FF0000"
        }
    }
}
export default function PaymentForm() {
    const [showModal, setShow] = useState(false);
    const [showError, setError] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
    if(!error) {
        handleShow();
    } else{
        return alert(error.message)
    }
}
  return (
    <div className="paymentDiv">
        {!success ?
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS} />
                </div>
            </fieldset>
            <button className='payButton'>Pay</button>
            <h3>{handleSubmit}</h3>
            <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Your payment went through!!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Thank you for your purchase! Please enjoy. 🍚 </p>
                <button><Link to="/menu">Back to Main Menu</Link></button>
            </Modal.Body>
            </Modal>
        </form>
        :
        <div>
    
        </div>
    }
    </div>
  )
}