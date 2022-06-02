import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_ORDERS } from "../utils/queries";

import Orders from "../components/Orders";

const Order = () => {

    const {loading: orderLoading, data: orderData} = useQuery(QUERY_ALL_ORDERS)

    const orders = orderData?.allOrders || []

    return (
        <div>
            <div>
                {orderLoading ? (
                    <div>Loading Order...</div>
                ):(
                    <div>
                        <h3>Order</h3>
                        <hr/>
                        <Orders orders ={orders}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Order;