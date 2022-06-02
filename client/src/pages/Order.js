import StripeContainer from "../components/StripeContainer";
import "../../src/Stripe.css"
// import pokebowl from "images/download.jpg"
import { useState } from 'react'
import pokebowl from '../assets/download.jpg'
import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_ORDERS } from "../utils/queries";
import Orders from "../components/Orders";
const Order = () => {
    const {loading: orderLoading, data: orderData} = useQuery(QUERY_ALL_ORDERS)
    const orders = orderData?.allOrders || []
    const [showItem, setShowItem] = useState(false)
    return (
        <div>
            <div>
                {orderLoading ? (
                    <div>Loading Order...</div>
                ) : (
                    <div>
                        <h3>Order</h3>
                        <hr />
                        <div className="App">
                            {showItem ? <StripeContainer /> : <> <h3>$12.00</h3>
                                <img src={pokebowl} alt="Pokebowl" />
                                <button onClick={() => setShowItem(true)}>Purchase Bowl</button></>}
                        </div>
                        <Orders orders={orders} />
                    </div>
                )}
                
            </div>
            <div className="App">
    {showItem ? <StripeContainer /> : <> <h3>$12.00</h3>
    <img src={pokebowl} alt="Pokebowl" />
    <button onClick={() => setShowItem(true)}>Purchase Bowl</button></>}
</div>
        </div>
    )
}
export default Order;