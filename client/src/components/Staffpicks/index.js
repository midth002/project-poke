import React, {useState} from "react";
import Button from "react-bootstrap/Button";

import CreateBowlForm from "../CreateBowl";
import './staffPicks.css';


const StaffPicks = ({staffpicks}) => {      
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
             {/* <div>
                <h4>Create Your Own!</h4>
                <p>Create your own poke bowl from scratch! Choose from a wide range of fresh ingredients.</p>
                <Button onClick={handleShow}>Start Crafting</Button>
            </div> */}


            {staffpicks.map((staffpicks)=>(
                <div className="staffPicks_container">
                    <h4>{staffpicks.name}</h4>
                    <p>{staffpicks.description}</p>
                    <strong>Price: ${staffpicks.price}</strong>
                    <br/>
                    <Button>Add to Order</Button>
                    
                </div>
            ))}
            <h4>Create Your Own!</h4>
            <p>Create your own poke bowl from scratch! Choose from a wide range of fresh ingredients.</p>
            <CreateBowlForm />
            
            
            
        </div>
    )
        }

export default StaffPicks;