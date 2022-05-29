import React from "react";
import Button from "react-bootstrap/Button";

const Bevs = ({bevs}) => {
    return (
        <div>
            {bevs.map((bevs)=>
            <div>
                <h4>{bevs.beverage}</h4>
                <strong>Price: ${bevs.price}</strong>
                <br/>
                <Button>Add To Order</Button>
                <br/>
                <br/>
            </div>    
                )}
        </div>
    )
}

export default Bevs