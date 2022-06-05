import React, {useState, useEffect} from "react";
import {Button,
        Card,
        Row,
        Col,} from "react-bootstrap";
import Auth from "../../utils/auth";

import { useQuery } from "@apollo/client";
import { QUERY_ALL_ORDERS } from "../../utils/queries";
import {useMutation} from '@apollo/client'
import { ADD_DRINK, CREATE_ORDER, ADD_ORDER } from '../../utils/mutations';
import './drinks.css'

const Bevs = ({bevs}) => {
    const {data, loading} = useQuery(QUERY_ALL_ORDERS)
    // console.log(data)
    const orderList = data?.allOrders||[]
    // console.log(orderList)
    const trueOrder = orderList.filter(order => order.currentOrder)
    const [addDrink, {error: drinkError, data: drinkData}] = useMutation(ADD_DRINK)
    const [createOrder, {error: orderError, data: orderData}] = useMutation(CREATE_ORDER)
    const [addOrder, {error: userOrderError, data: userOrderData}]=useMutation(ADD_ORDER)
    

    const [order, setOrder]= useState("")
    const [drink, setDrink] = useState("")

    
    const handleChange = async (event) => {
        try {
            const {data} = await addDrink({
                variables: {
                orderId: trueOrder[0]._id,
                drinkId: event.target.value
                }
                })
    
                console.log(data)
            }catch(error){
                console.error(error)
            }
    }



    return (
        <div>
            {Auth.loggedIn()?(
                <div>
                    {/* <Row> */}
                        
                            <Card className="drink_container">
                                <h1>Drinks</h1>                            
                                {bevs.map((bevs)=>
                                <Card className="drink_cards">
                                    <Card.Body>
                                        <Card.Title>{bevs.beverage}</Card.Title>
                                        <Card.Subtitle>Price: ${bevs.price}</Card.Subtitle>
                                        <br/>                        
                                        <Button value={bevs._id} onClick={handleChange}>Add To Order</Button>                        
                                    </Card.Body> 
                                    </Card>                       
                                )}
                            </Card>
                        
                    {/* </Row>     */}
                </div>    
            ):(
                <div>
                {bevs.map((bevs)=>
                <div>
                    <h4>{bevs.beverage}</h4>
                    <strong>Price: ${bevs.price}</strong>                    
                </div>    
                    )}
            </div>
            )}
        </div>
    )
}

export default Bevs