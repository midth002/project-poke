import React from "react";
import Auth from '../../utils/auth'

import { useQuery } from "@apollo/client";
import { QUERY_ALL_ORDERS } from "../../utils/queries";
import {useMutation} from '@apollo/client'
import { ADD_SIDE, CREATE_ORDER } from '../../utils/mutations';

import './sides.css';
import {Button, Card} from "react-bootstrap";

const Sides = ({sides}) => {
    const {data, loading} = useQuery(QUERY_ALL_ORDERS)
    
    const orderList = data?.allOrders||[]
   
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

            
        }catch(error){
            console.error(error)
        }
    }

    return (
        <div>
            {Auth.loggedIn() ? (
                <div>
                    <Card className="sides_container">
                        <h1>Sides</h1>
                        {sides.map((sides) =>
                            <Card className="sides_cards">
                                <Card.Body>
                                    <Card.Title>{sides.name}</Card.Title>
                                    <Card.Subtitle>Price: ${sides.price}</Card.Subtitle>
                                    <Card.Text>{sides.description}</Card.Text>
                                    <Button value={sides._id} onClick={handleChange}>Add to Order</Button>
                                </Card.Body>
                            </Card>
                        )}
                    </Card>
                </div>
            ) : (
                <Card className="sides_container">
                    <h1>Sides</h1>
                    {sides.map((sides) =>
                        <Card className="sides_cards">
                            <Card.Body>
                                <Card.Title>{sides.name}</Card.Title>
                                <Card.Subtitle>Price: ${sides.price}</Card.Subtitle>
                                <Card.Text>{sides.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                </Card>
            )}
        </div>
    )
}

export default Sides