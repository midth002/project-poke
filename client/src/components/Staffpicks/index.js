import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_ORDERS } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { ADD_STAFF_PICK } from "../../utils/mutations";


import CreateBowlForm from "../CreateBowl";
import {Modal} from 'react-bootstrap';


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
            console.log(error)
        }
    }

    return (
        <div>
            {staffpicks.map((staffpicks)=>(
                <div>
                    <h4>{staffpicks.name}</h4>
                    <p>{staffpicks.description}</p>
                    <strong>Price: ${staffpicks.price}</strong>
                    <br/>
                    <Button value={staffpicks._id} onClick={handleChange}>Add to Order</Button>
                    <br/>
                    <br/>
                </div>
            ))}
            <h4>Create Your Own!</h4>
            <p>Create your own poke bowl from scratch! Choose from a wide range of fresh ingredients.</p>
            {/* <Button onClick={handleShow}>Start Crafting</Button> */}
            
            
        </div>
    )
}

export default StaffPicks;