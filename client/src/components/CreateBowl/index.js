import React, {useState, useEffect} from 'react';
import { useQuery, useMutation} from '@apollo/client';
import { CREATE_BOWL, ADD_BOWL } from '../../utils/mutations';
import {Modal, Form, Button} from 'react-bootstrap';
import { QUERY_ALL_ORDERS } from "../../utils/queries";


const CreateBowlForm = () => {
    // ==== for modal ====
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // ==== build a bowl ====
    const [createBowl, {error}] = useMutation(CREATE_BOWL);
    const [bowl, setBowl] = useState({
        size: "",
        base: "",
        protein: "",
        veggies: "",
        sauces: "", 
        toppings: ""
    });

    const handleFormChange = async (event) => {
        const {name, value} = event.target;

        if (name === "size" && value) {
            setBowl({...bowl, [name]: value})
        }
    // try {
    //     const {data} = await createBowl({
    //         // variables: {
    //         //     size: event.target.value
    //         // }
    //     });
    //     setBowl({
    //         size: '',
    //         base: '',
    //         protein: '',
    //         veggies: '',
    //         sauces: '',
    //         toppings: '',
    //     })
    //     console.log("create bowl")
    // } catch(error) {
    //     console.log(error)
    // }
}
    // const [showModal, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);  

    // setBowl({
    //     size: '',
    //     base: '',
    //     protein: '',
    //     veggies: '',
    //     sauces: '',
    //     toppings: '',
    // })   

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // const {name, value} = event.target
        try {
            const {data} = createBowl({
                variables: {...bowl}
            });
            
            
            console.log("create bowl", data)
        } catch (e) {
            console.log(e);
        }
        // setBowl({
        //     size: '',
        //     base: '',
        //     protein: '',
        //     veggies: '',
        //     sauces: '',
        //     toppings: '',
        // })
    //    handleFormChange();
        
        
    };



    return (
        <div>
        <Button onClick={handleShow}>Create</Button>

        <Modal show={showModal} onHide={handleClose} onSubmit={handleFormSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Build Your Bowl</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* bowl size */}
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Size</Form.Label>                        
                        <Form.Check onClick={handleFormChange} value={bowl.size} name="size" type="checkbox" label="Small" />      
                        <Form.Check type="checkbox" label="Medium" />
                        <Form.Check type="checkbox" label="Large" />                                              
                    </Form.Group>
                    {/* ==== base ==== */}
                    {/* <Form.Group onChange={handleFormChange} name="base" className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Base</Form.Label>
                        <Form.Check  type="checkbox" label="White Rice" />
                        <Form.Check type="checkbox" label="Brown Rice" />
                        <Form.Check type="checkbox" label="Tofu" />
                        <Form.Check type="checkbox" label="Salad" />                        
                    </Form.Group>
                    // ==== protein ====
                    <Form.Group onChange={handleFormChange} className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Protein</Form.Label>
                        <Form.Check type="checkbox" label="Salmon" />
                        <Form.Check type="checkbox" label="Tuna" />
                        <Form.Check type="checkbox" label="Tofu" />                                               
                    </Form.Group>
                    // ==== veggies ====
                    <Form.Group onChange={handleFormChange} className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Veggies</Form.Label>
                        <Form.Check  type="checkbox" label="Cucumber" />
                        <Form.Check type="checkbox" label="So many" />                                               
                    </Form.Group>
                    // ==== sauces ====
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Sauces</Form.Label>
                        <Form.Check type="checkbox" label="Spicy Mayo" />
                        <Form.Check type="checkbox" label="Add more" />                                               
                    </Form.Group>
                    // ==== toppings ====
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Toppings</Form.Label>
                        <Form.Check type="checkbox" label="Seaweed" />
                        <Form.Check type="checkbox" label="Such yum" />                                               
                    </Form.Group> */}
                    <Button variant="primary" type="submit" >
                        Add to Order
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Nevermind
                </Button>
                {/* <Button variant="primary"  type='submit'>
                    Add to Order
                </Button> */}
            </Modal.Footer>
        </Modal>      
        </div>
    );
};

export default CreateBowlForm;