import React from "react";
import Button from "react-bootstrap/Button"

const StaffPicks = ({staffpicks}) => {
    return (
        <div>
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
            <h4>Create Your Own!</h4>
            <p>Create your own poke bowl from scratch! Choose from a wide range of fresh ingredients.</p>
            <Button>Start Crafting</Button>
        </div>
    )
}

export default StaffPicks;