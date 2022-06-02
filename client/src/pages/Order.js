import StripeContainer from "../components/StripeContainer";
import "../../src/Stripe.css"
// import pokebowl from "images/download.jpg"
import { useState } from 'react'
import pokebowl from '../assets/download.jpg'


function Order() {
    const [showItem, setShowItem] = useState(false)
    return (
<div className="App">
   {showItem ? <StripeContainer /> : <> <h3>$12.00</h3>
   <img src={pokebowl} alt="Pokebowl" />
   <button onClick={() => setShowItem(true)}>Purchase Bowl</button></>}
</div>
    );
}

export default Order;