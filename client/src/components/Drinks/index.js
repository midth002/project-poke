import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";

import { useQuery } from "@apollo/client";
import { QUERY_ALL_ORDERS } from "../../utils/queries";
import {useMutation} from '@apollo/client'
import { ADD_DRINK, CREATE_ORDER } from '../../utils/mutations'

const Bevs = ({bevs}) => {
    const {data, loading} = useQuery(QUERY_ALL_ORDERS)
    // console.log(data)
    const orderList = data?.allOrders||[]
    // console.log(orderList)
    const trueOrder = orderList.filter(order => order.currentOrder)
    const [addDrink, {error: drinkError, data: drinkData}] = useMutation(ADD_DRINK)
    const [createOrder, {error: orderError, data: orderData}] = useMutation(CREATE_ORDER)
    

    const [order, setOrder]= useState("")
    const [drink, setDrink] = useState("")

    
    const handleChange = async (event) => {
        if(trueOrder[0]){
            try {
                const {data} = await addDrink({
                    variables: {
                    orderId: trueOrder[0]._id,
                    drinkId: event.target.value
                }
                })
    
                // console.log(data)
            }catch(error){
                console.log(error)
            }
        } else {
            try {
                await createOrder({})
                const {data} = await addDrink({
                    variables: {
                    orderId: trueOrder[0]._id,
                    drinkId: event.target.value
                }
                })
            } catch(error){
                console.log(error)
            }

        }
    }



    return (
        <div>
            {bevs.map((bevs)=>
            <div>
                <h4>{bevs.beverage}</h4>
                <strong>Price: ${bevs.price}</strong>
                <br/>
                <Button value={bevs._id} onClick={handleChange}>Add To Order</Button>
                <br/>
                <br/>
            </div>    
                )}
        </div>
    )
}

export default Bevs