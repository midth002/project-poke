import React, {useState} from "react";
import Auth from '../../utils/auth';

import { useQuery } from "@apollo/client";
import { QUERY_ALL_ORDERS } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { ADD_STAFF_PICK } from "../../utils/mutations";

import CreateBowlForm from "../CreateBowl";
import './staffPicks.css';
import {Button, 
        Card, 
        Row, 
        Col, 
        Container,
        CardGroup} from "react-bootstrap";

const StaffPicks = ({staffpicks}) => {      
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {data, loading} = useQuery(QUERY_ALL_ORDERS)

    const orderList = data?.allOrders||[]

    const trueOrder = orderList.filter(order => order.currentOrder)

    const [addStaffPick, {error, data: staffPickData}] = useMutation(ADD_STAFF_PICK)

    const handleChange = async (event) => {
        try {
            const {data} = await addStaffPick({
                variables: {
                orderId: trueOrder[0]._id,
                staffPickId: event.target.value
            }
            })

            // console.log(data)
        }catch(error){
            console.error(error)
        }
    }

    return (
        <div>
            {Auth.loggedIn() ? (
                <div>
                    <Card className="staffPicks_container">
                        <h1>Poke Bowls</h1>

                        {staffpicks.map((staffpicks) => (
                            <Card className="staffPicks_cards">
                                <Card.Body>
                                    <Card.Title>{staffpicks.name}</Card.Title>
                                    <Card.Subtitle>Price: ${staffpicks.price}</Card.Subtitle>
                                    <Card.Text>{staffpicks.description}</Card.Text>
                                    <Button value={staffpicks._id} onClick={handleChange}>Add to Order</Button>
                                </Card.Body>
                            </Card>

                        ))}
                        <Card className="staffPicks_cards">
                            <Card.Body>
                                <Card.Title>Create Your Own!</Card.Title>
                                <Card.Text>Create your own poke bowl from scratch! Choose from a wide range of fresh ingredients</Card.Text>
                                <CreateBowlForm />
                            </Card.Body>
                        </Card>
                    </Card>
                </div>
            ) : (
                <div>
                    <Card className="staffPicks_container">

                        <h1>Poke Bowls</h1>
                        {staffpicks.map((staffpicks) => (

                            <Card className="staffPicks_cards">
                                <Card.Body>
                                    <Card.Title>{staffpicks.name}</Card.Title>
                                    <Card.Subtitle>Price: ${staffpicks.price}</Card.Subtitle>
                                    <Card.Text>{staffpicks.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                        <Card className="staffPicks_cards">
                            <Card.Body>
                                <Card.Title>Create Your Own!</Card.Title>
                                <Card.Text>Create your own poke bowl from scratch! Choose from a wide range of fresh ingredients</Card.Text>
                                <CreateBowlForm />
                            </Card.Body>

                        </Card>
                    </Card>
                </div>
            )}
        </div>
    )
}

export default StaffPicks