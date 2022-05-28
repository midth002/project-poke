import React from "react";
import Button from "react-bootstrap/Button";

const Sides = ({sides}) => {
    return (
        <div>
            {sides.map((sides)=>(
                <div>
                    <h4>{sides.name}</h4>
                    <p>{sides.description}</p>
                    <strong>Price: ${sides.price}</strong>
                    <br/>
                    <Button>Add to Order</Button>
                    <br/>
                    <br/>
                </div>    
            ))}
        </div>
    )
}

export default Sides