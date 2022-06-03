import React, {useState} from 'react';
import { useMutation} from '@apollo/client';
import { CREATE_BOWL, ADD_BOWL } from '../../utils/mutations';
import {Modal, Form, Button} from 'react-bootstrap';
import './createBowl.css';



const CreateBowlForm = () => {
    // ==== for modal ====
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // ==== build a bowl ====
    const [createBowl, {error}] = useMutation(CREATE_BOWL);
    // const [addBowl] = useMutation(ADD_BOWL);
    
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
        console.log(name, value)        
        setBowl({...bowl, [name]: value})    
    }
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(bowl)
        
        try {
            const data = await createBowl({
                variables: {...bowl}
            });           
            console.log("create bowl", data);
            // handleClose();
        } catch (e) {
            console.log(JSON.stringify(e, null, 2));
        }       
    };

    return (
        <div className='createBowl_container'>
            <div>
                <Button onClick={handleShow}>Create</Button>
            </div>
        <Modal show={showModal} onHide={handleClose} onSubmit={handleFormSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Build Your Bowl</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* bowl size */}
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Size</Form.Label>                        
                        <Form.Check onClick={handleFormChange} value={'small'} name="size" className="checkmark" type="checkbox" label="Small" />      
                        <Form.Check onClick={handleFormChange} value={'medium'} name="size" type="checkbox" label="Medium" />
                        <Form.Check onClick={handleFormChange} value={'large'} name="size" type="checkbox" label="Large" />
                    </Form.Group>
                    {/* ==== base ==== */}
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Base</Form.Label>
                        <Form.Check onClick={handleFormChange} value={'white rice'} name="base" type="checkbox" label="White Rice" />
                        <Form.Check onClick={handleFormChange} value={'brown rice'} name="base" type="checkbox" label="Brown Rice" />
                        <Form.Check onClick={handleFormChange} value={'mix greens'} name="base" type="checkbox" label="Mix Greens" />
                        {/* <Form.Check onClick={handleFormChange} value={'Half & Half'} name="base" type="checkbox" label="Half & Half" /> */}
                    </Form.Group>
                    {/* // ==== protein ==== */}
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Protein</Form.Label>
                        <Form.Check onClick={handleFormChange} value={'salmon'} name="protein" type="checkbox" label="Salmon" />
                        <Form.Check onClick={handleFormChange} value={'tuna'} name="protein" type="checkbox" label="Tuna" />
                        <Form.Check onClick={handleFormChange} value={'shrimp'} name="protein" type="checkbox" label="Shrimp" />
                        <Form.Check onClick={handleFormChange} value={'tofu'} name="protein" type="checkbox" label="Tofu" />                                               
                    </Form.Group>
                    {/* // ==== veggies ==== */}
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Veggies</Form.Label>
                        <Form.Check onClick={handleFormChange} value={'cucumber'} name="veggies"  type="checkbox" label="Cucumber" />
                        <Form.Check onClick={handleFormChange} value={'avocado'} name="veggies"  type="checkbox" label="Avocado" /> 
                        <Form.Check onClick={handleFormChange} value={'tomato'} name="veggies"  type="checkbox" label="Tomato" />
                        <Form.Check onClick={handleFormChange} value={'corn'} name="veggies"  type="checkbox" label="Corn" />
                        <Form.Check onClick={handleFormChange} value={'cabbage'} name="veggies"  type="checkbox" label="Cabbage" />
                        <Form.Check onClick={handleFormChange} value={'kimchee'} name="veggies"  type="checkbox" label="Kimchee" />                                              
                    </Form.Group>
                    {/* // ==== sauces ==== */}
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Sauces</Form.Label>
                        <Form.Check onClick={handleFormChange} value={'spicy mayo'} name="sauces"type="checkbox" label="Spicy Mayo" />
                        <Form.Check onClick={handleFormChange} value={'yum yum'} name="sauces"type="checkbox" label="Yum Yum Sauce" />                                               
                        <Form.Check onClick={handleFormChange} value={'eel sauce'} name="sauces"type="checkbox" label="Eel Sauce" /> 
                    </Form.Group>
                    {/* // ==== toppings ==== */}
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Toppings</Form.Label>
                        <Form.Check onClick={handleFormChange} value={'seaweed'} name="toppings" type="checkbox" label="Seaweed" />
                        <Form.Check onClick={handleFormChange} value={'crispy tempura'} name="toppings" type="checkbox" label="Crispy Tempura" />
                        <Form.Check onClick={handleFormChange} value={'crispy onion'} name="toppings" type="checkbox" label="Crispy Onion" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add to Order
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                    Nevermind
                </Button>
                </Form>
            </Modal.Body>            
        </Modal>      
        </div>
    );
};

export default CreateBowlForm;