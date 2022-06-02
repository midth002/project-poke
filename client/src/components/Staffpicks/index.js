import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import { useQuery } from "@apollo/client";
import { useMutation } from '@apollo/client';
import { ADD_STAFF_PICK } from "../../utils/mutations";
import { QUERY_ALL_ORDERS } from "../../utils/queries";
// import CreateBowlForm from "../CreateBowl";
import {Modal} from 'react-bootstrap';



const StaffPicks = ({staffpicks}) => {      
    const {data, loading} = useQuery(QUERY_ALL_ORDERS)
    // console.log(data)
    const orderList = data?.allOrders||[]
    // console.log(orderList)
    const trueOrder = orderList.filter(order => order.currentOrder)
    const [addStaffPick, {error, data: staffData}] = useMutation(ADD_STAFF_PICK)
    

    // console.log(trueOrder)

    const [order, setOrder]= useState("")
    const [staffPick, setStaffPick] = useState("")

    const handleChange = async (event) => {
        try {
            const {data} = await addStaffPick({
                variables: {
                orderId: trueOrder[0]._id,
                staffPickId: event.target.value
            }
            })

            console.log(data)
        }catch(error){
            console.log(error)
        }
    }




    return (
        <div>
             {/* <div>
                <h4>Create Your Own!</h4>
                <p>Create your own poke bowl from scratch! Choose from a wide range of fresh ingredients.</p>
                <Button onClick={handleShow}>Start Crafting</Button>
            </div> */}


            {staffpicks.map((staffpicks)=>(
                <div>
                    <h4>{staffpicks.name}</h4>
                    <p>{staffpicks.description}</p>
                    <strong>Price: ${staffpicks.price}</strong>
                    <br/>
                    <Button>Add to Order</Button>
                    <br/>
                    <br/>
                </div>
            ))}
           
            
            
        </div>
    )
        }

export default StaffPicks;