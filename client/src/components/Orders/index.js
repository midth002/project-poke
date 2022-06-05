import React from "react"
import {Button} from 'react-bootstrap'    
import './orders.css';
import { useMutation } from "@apollo/client"
import { DELETE_DRINK, DELETE_SIDE, DELETE_STAFF_PICK, DELETE_BOWL } from "../../utils/mutations";


const Orders = ({orders}) => {
    // console.log(orders)
    const [deleteDrink, {error: drinkError, data: deletedDrinkData}]= useMutation(DELETE_DRINK)
    const [deleteSide, {error: sideError, data: deleteSideData}]=useMutation(DELETE_SIDE)
    const [deleteStaffPick, {error: staffPickError, data: deleteStaffPickData}]= useMutation(DELETE_STAFF_PICK)
    const [deleteBowl, {error: bowlError, data: deleteBowlData}]= useMutation(DELETE_BOWL)
    
    const handleDrinkDelete = async (event) => {
        try {
            const {data} = await deleteDrink({
                variables: {
                    orderId: orders[0]._id,
                    drinkId: event.target.value
                }
            })
        }catch(error){
            console.error(error)
        }
    }
    const handleSideDelete = async (event) => {
        try {
            const {data} = await deleteSide({
                variables: {
                    orderId: orders[0]._id,
                    sideId: event.target.value
                }
            })
        }catch(error){
            console.error(error)
        }
    }

    const handleStaffPickDelete = async (event) => {
        try {
            const {data} = await deleteStaffPick({
                variables: {
                    orderId: orders[0]._id,
                    staffPickId: event.target.value
                }
            })
        }catch(error){
            console.error(error)
        }
    }

    const handleBowlDelete = async (event) => {
        try {
            const {data} = await deleteBowl({
                variables: {
                    orderId: orders[0]._id,
                    bowlId: event.target.value
                }
            })
        }catch(error){
            console.error(error)
        }
    }

    return (
        <div className="container">
        <div>             
            {orders.map((order)=>order.drinkId.map((drink)=>
            <div className="row orderRow">
            <div className="col">
            <h4>{drink.beverage}</h4>
               
                    <h6>${drink.price}.00</h6>
                </div>
                <div className="col removeBtnDiv">
                    <Button value={drink._id} onClick={handleDrinkDelete} className="removeBtn">Remove Item</Button>
                </div>
                </div>
            ))}            
        </div>
        <div>
            {orders.map((order)=>order.sideId.map((side)=>
            <div className="row orderRow">
            <h4>{side.name}</h4>
                <div className="col">
                    <h6>${side.price}.00</h6>
                    <p>{side.description}</p>
                </div>
                <div className="col removeBtnDiv">
                    <Button value={side._id} onClick={handleSideDelete} className="removeBtn">Remove Item</Button>
                </div>
            </div>
            ))}
        </div>
        <div>
            {orders.map((order)=>order.staffPickId.map((staffPick)=>
            <div className="row orderRow">
                <h4>{staffPick.name}</h4>
                    <div className="col">
                        <h5>${staffPick.price}.00</h5>
                        <h6>size: large</h6>
                        <p>{staffPick.description}</p>
                    </div>
                   
                <div className="col">
                <Button value={staffPick._id} onClick={handleStaffPickDelete} className="removeBtn">Remove Item</Button>
                </div>
                
            </div>
            ))}
        </div>
        <div>
            {orders.map((order)=>order.bowlId.map((bowl)=>
            <div className="row orderRow">
            <h4>Created Bowl</h4>
                <div className="col">
                    {bowl.size == "small" && <h5>$15.00</h5>}
                    {bowl.size == "medium" && <h5>$17.00</h5>}
                    {bowl.size == "large" && <h5>$19.00</h5>}
                    <h6>size: {bowl.size}</h6>
                    <p>{bowl.base}, {bowl.protein}, {bowl.veggies}, {bowl.sauces}, {bowl.toppings}</p>
                </div>
                <div className="col">
                <Button value={bowl._id} onClick={handleBowlDelete} className="removeBtn" >Remove Item</Button>
                </div>
            </div>
            ))}
        </div>
        </div>
        
    )
}

export default Orders