import React, {useState} from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import "../Stripe/Stripe.css"
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { QUERY_ALL_ORDERS } from "../../utils/queries";
import { COMPLETE_ORDER } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Auth from "../../utils/auth";


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





const PaymentForm = () => {
    const [showModal, setShow] = useState(false);
    const [showError, setError] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ success, setSuccess ] = useState(false)
    const [currentOrderFalse, {error: currentOrderError, data: currentOrderData}]= useMutation(COMPLETE_ORDER)
    const stripe = useStripe()
    const elements = useElements()


    const {loading: orderLoad, data: orderData} = useQuery(QUERY_ALL_ORDERS)
const getOrder = () => {
    console.log("order data", orderData);
    const orderList = orderData?.allOrders || []
    const trueOrder = orderList.filter(order => order.currentOrder)
    const myOrder = trueOrder[0]._id;
    return myOrder;
    
}

const completeOrder = async (e) => {
    console.log(getOrder())
    const approveOrder = getOrder();
    try {
        const {data} = await currentOrderFalse({
            variables: {
                orderId: approveOrder
            }
        })
    } catch(error) {
        console.log(error)
    }
}

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
    if(!error) {
        handleShow();
        completeOrder();
    } else{
        return alert(error.message)
    }
}
  return (
    <div className="paymentDiv">
        {!success ?
        <div className="row">
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
                <Link to="/home">Back to the home page</Link>
            </Modal.Body>
            </Modal>
        </form>
        </div>
        :
        <div>
    
        </div>
    }
    </div>
  )
}

export default PaymentForm;