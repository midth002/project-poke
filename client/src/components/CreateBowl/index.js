import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import { CREATE_BOWL } from '../../utils/mutations';
import {Modal, Form, Button} from 'react-bootstrap';
import { storeKeyNameFromField } from '@apollo/client/utilities';

const CreateBowlForm = () => {
    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [bowl, setBowl] = useState({
        size: '',
        base: '',
        protein: '',
        veggies: '',
        sauces: '',
        toppings: '',

    });
    const [createBowl, {error}] = useMutation(CREATE_BOWL);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const {data} = createBowl({
                variables: {...bowl}
            });
            
            setBowl({
                size: '',
                base: '',
                protein: '',
                veggies: '',
                sauces: '',
                toppings: '',
            })
        } catch (e) {
            console.error(e);
        }

        console.log('added')
        console.log(typeof bowl.size)
        //handleClose();
        
    };

    const handleFormChange = (event) => {
        // const {data} = createBowl({
        //     variables: {...bowl}
        // })        

        // setBowl(event.target.value)
        // console.log(...bowl)

        const {name, value} = event.target;

        if (name === 'size' && value.true) {
            setBowl({...bowl, [name]: value});
        } else if (name === 'base' && value.true) {
            setBowl({...bowl, [name]: value});
        }
    }

    return (
        <div>
        <Button onClick={handleShow}>Create</Button>

        <Modal show={showModal} onHide={handleClose} onSubmit={handleFormSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Build Your Bowl</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Size</Form.Label>                        
                        <Form.Check 
                        // onClick={() => setBowl(bowl.size='small')}
                        onChange={(event) => setBowl(event.target.value)} value={bowl.size} name="size" type="checkbox" label="Small" />      
                        <Form.Check type="checkbox" label="Medium" />
                        <Form.Check type="checkbox" label="Large" />                                              
                    </Form.Group>
                    <Form.Group onChange={handleFormChange} value={bowl.base} name="base" className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Base</Form.Label>
                        <Form.Check value={bowl.base} type="checkbox" label="White Rice" />
                        <Form.Check type="checkbox" label="Brown Rice" />
                        <Form.Check type="checkbox" label="Tofu" />
                        <Form.Check type="checkbox" label="Salad" />                        
                    </Form.Group>
                    <Form.Group onChange={handleFormChange} className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Protein</Form.Label>
                        <Form.Check value={bowl.protein} type="checkbox" label="Salmon" />
                        <Form.Check type="checkbox" label="Tuna" />
                        <Form.Check type="checkbox" label="Tofu" />                                               
                    </Form.Group>
                    <Form.Group onChange={handleFormChange} className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Veggies</Form.Label>
                        <Form.Check value={bowl.veggies} type="checkbox" label="Cucumber" />
                        <Form.Check type="checkbox" label="So many" />                                               
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Sauces</Form.Label>
                        <Form.Check type="checkbox" label="Spicy Mayo" />
                        <Form.Check type="checkbox" label="Add more" />                                               
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Toppings</Form.Label>
                        <Form.Check type="checkbox" label="Seaweed" />
                        <Form.Check type="checkbox" label="Such yum" />                                               
                    </Form.Group>
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