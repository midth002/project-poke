import React from "react"
import Button from 'react-bootstrap/Button'

import { useMutation } from "@apollo/client"
import { DELETE_DRINK, DELETE_SIDE, DELETE_STAFF_PICK } from "../../utils/mutations"

const Orders = ({orders}) => {
    // console.log(orders)
    const [deleteDrink, {error: drinkError, data: deletedDrinkData}]= useMutation(DELETE_DRINK)
    const [deleteSide, {error: sideError, data: deleteSideData}]=useMutation(DELETE_SIDE)
    const [deleteStaffPick, {error: staffPickError, data: deleteStaffPickData}]= useMutation(DELETE_STAFF_PICK)
    
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
    return (
        <div>
        <div>
            {orders.map((order)=>order.drinkId.map((drink)=>
            <div>
                <h3>{drink.beverage}</h3>
                <h1>${drink.price}</h1>
                <Button value={drink._id} onClick={handleDrinkDelete}>Remove Item</Button>
            </div>
            ))}
        </div>
        <div>
            {orders.map((order)=>order.sideId.map((side)=>
            <div>
                <h3>{side.name}</h3>
                <h1>${side.price}</h1>
                <Button value={side._id} onClick={handleSideDelete}>Remove Item</Button>
            </div>
            ))}
        </div>
        <div>
            {orders.map((order)=>order.staffPickId.map((staffPick)=>
            <div>
                <h3>{staffPick.name}</h3>
                <h1>${staffPick.price}</h1>
                <Button value={staffPick._id} onClick={handleStaffPickDelete}>Remove Item</Button>
            </div>
            ))}
        </div>
        </div>
    )
}

export default Orders