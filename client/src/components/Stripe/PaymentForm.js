import React, {useState} from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios";
import "../Stripe/Stripe.css"


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
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}


export default function PaymentForm() {
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
        try{
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:3001/payment", {
                amount: 1000,
                id: id
            })

            if(response.data.success) {
                console.log("Successful Payment")
                setSuccess(true)
            }
        }catch{
            console.log("Error", error)
        }
    } else{
        console.log(error.message)
    }
}
  return (
    <>
        {!success ?
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS} />
                </div>
            </fieldset>
            <button className='payButton' >Pay</button>
        </form>
        :
        <div>
            <h2>You just bought a delicious Poke Bowl!</h2>
        </div>
    }
    </>
  )
}
