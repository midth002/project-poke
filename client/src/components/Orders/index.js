import React from "react"

const Orders = ({orders}) => {
    //console.log(orders)
    orders.map((order)=>order.drinkId.map((drink)=>console.log(drink.beverage)))
    return (
        <div>
            {orders.map((order)=>order.drinkId.map((drink)=>
            <div>
                <h3>{drink.beverage}</h3>
                <h1>${drink.price}</h1>
            </div>
            ))}
        </div>
    )
}

export default Orders