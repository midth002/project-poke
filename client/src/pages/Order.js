import React from "react";
import StripeContainer from "../components/Stripe/StripeContainer";

// import pokebowl from "images/download.jpg"
import { useState } from 'react'
import pokebowl from '../assets/download.jpg'


import { useQuery } from "@apollo/client";
import { QUERY_ALL_ORDERS } from "../utils/queries";
import Orders from "../components/Orders";

const Order = () => {
    const [showItem, setShowItem] = useState(false);
    const [totalval, setTotalVal] = useState(0)

    const {loading: orderLoading, data: orderData} = useQuery(QUERY_ALL_ORDERS)
    const orders = orderData?.allOrders || []

    const trueOrder = orders.filter(order=> order.currentOrder)
    // console.log("orders", orders)
    
    const drinkTotal = async (orders)=> {
        let drinkSum = 0;
        // console.log("drinkTotal", orders)
        await orders.drinkId.forEach((drink)=>{
        drinkSum+= drink.price
        // console.log(sum.toFixed(2));
        })
        let sideSum = 0
        await orders.sideId.forEach((side)=>{
            sideSum += side.price
        })
        let staffPickSum = 0
        await orders.staffPickId.forEach((staffPick)=>{
            staffPickSum += staffPick.price
        })
        const grandTotal = drinkSum + sideSum + staffPickSum
        return grandTotal.toFixed(2)
    }

    let drinksTotalVal;
    drinkTotal(orders[0]).then(data=>setTotalVal(data))





    return (
        <div>
            {trueOrder[0]?(
        <div>
            <div>
                {orderLoading ? (
                    <div>Loading Order...</div>
                ):(
                    <>
                    <div>
                        <h3>Order</h3>
                        <hr />
                        <Orders orders={orders} />
                    </div>
                    <div className="App">
                        {showItem ? <StripeContainer /> : <> <h3>Total:${totalval}</h3>
                        <img src={pokebowl} alt="Pokebowl" />
                        <button className='payButton'onClick={() => setShowItem(true)}>Purchase Bowl</button></>}
                    </div>
                    </>
                )}
            </div>
        </div>

            ): (
                <h1>Visit the Menu to Start your Order!</h1>
            )}
        </div>
    )
}
export default Order;