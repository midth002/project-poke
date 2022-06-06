import React from "react";
import StripeContainer from "../components/Stripe/StripeContainer";
import './ordersPage.css';

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
    
    const totalCalc = async (orders) => {
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
        let bowlSum = 0
        await orders.bowlId.forEach((bowl) => {
            if (bowl.size == "small") {
                bowlSum += 15
            }

            if (bowl.size == "medium") {
                bowlSum += 17
            }

            if (bowl.size == "large") {
                bowlSum += 19
            }
        })
        const grandTotal = drinkSum + sideSum + staffPickSum + bowlSum
        return grandTotal.toFixed(2)
    }

    totalCalc(trueOrder[0]).then(data=>setTotalVal(data))

    return (
        <div className="container">
           
            {trueOrder[0]?(
            <div>
                {orderLoading ? (
                    <div>Loading Order...</div>
                ):(
                    <>
                    { <div className="row">
                        <div className="col">
                            <h3>Order</h3>
                        </div>
                        <div className="col remove-order-div">
                          <span></span>
                        </div>
                        <hr />
                        <div className="col align-middle">
                            <Orders orders={trueOrder} />
                        </div>
                    <div className="App col-md-4 pt-4">
                        <div className="pb-4 paymentDivForm">
                            <div className="text-center w-100">
                                <h4 className="w-100">Total: ${totalval}</h4>
                                <p className="w-100">Pay with card</p>
                            </div>
                            
                        </div>
                       <StripeContainer />
                       
                        </div>
                    </div>
                   
                    }
                    </>
                )}
            </div>
            

            ):(
                <h1>Please checkout menu to begin order</h1>
                
            )}
            </div>
        
    )
}
export default Order;
