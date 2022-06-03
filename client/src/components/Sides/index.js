import React from "react";
import Button from "react-bootstrap/Button";
import Auth from '../../utils/auth'

import { useQuery } from "@apollo/client";
import { QUERY_ALL_ORDERS } from "../../utils/queries";
import {useMutation} from '@apollo/client'
import { ADD_SIDE, CREATE_ORDER } from '../../utils/mutations'

const Sides = ({sides}) => {
    const {data, loading} = useQuery(QUERY_ALL_ORDERS)
    // console.log('data ln11', data)
    const orderList = data?.allOrders||[]
    // console.log(orderList)
    const trueOrder = orderList.filter(order => order.currentOrder)

    const [addSide, {error, data: sideData}] = useMutation(ADD_SIDE)
    const [createOrder, {error: orderError, data: orderData}] = useMutation(CREATE_ORDER)


    
    const handleChange = async (event) => {
        try {
            const {data} = await addSide({
                variables: {
                orderId: trueOrder[0]._id,
                sideId: event.target.value
            }
            })

            // console.log(data)
        }catch(error){
            console.error(error)
        }
    }
    return (
        <div>
            {Auth.loggedIn()?(
        <div>
            {sides.map((sides)=>
                <div>
                    <h4>{sides.name}</h4>
                    <p>{sides.description}</p>
                    <strong>Price: ${sides.price}</strong>
                    <br/>
                    <Button value={sides._id} onClick={handleChange}>Add to Order</Button>
                    <br/>
                    <br/>
                </div>    
            )}
        </div>

            ):(
                <div>
                {sides.map((sides)=>
                    <div>
                        <h4>{sides.name}</h4>
                        <p>{sides.description}</p>
                        <strong>Price: ${sides.price}</strong>
                        <br/>
                        <br/>
                    </div>    
                )}
            </div>
            )}

        </div>
    )
}

export default Sides