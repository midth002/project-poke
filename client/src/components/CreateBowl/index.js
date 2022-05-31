import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import { CREATE_BOWL } from '../../utils/mutations';
import {Modal, Form, Button} from 'react-bootstrap';

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
        console.log('added')
        console.log(bowl)
        //handleClose();
        
    };

    const handleOrderChange = (event) => {
        const {data} = createBowl({
            variables: {...bowl}
        })

        const {name, boolean} = event.target;

        if (name === 'base' && boolean.true) {
            setBowl({...bowl, [name]: boolean});
        } else if (name !==  'base') {
            //console.log({...bowl})
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
                <Form.Group onChange={handleOrderChange} className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Size</Form.Label>
                        <Form.Group className="mb-3">
                                <Form.Label>Disabled select menu</Form.Label>
                                <Form.Select>
                                    <option>Small</option>
                                    <option>Med</option>
                                    <option>Lrg</option>
                                </Form.Select>
                            </Form.Group>
                        <Form.Check type="checkbox" label="Medium" />
                        <Form.Check type="checkbox" label="Large" />                                              
                    </Form.Group>
                    <Form.Group onChange={handleOrderChange} className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Base</Form.Label>
                        <Form.Check value={bowl.base} type="checkbox" label="White Rice" />
                        <Form.Check type="checkbox" label="Brown Rice" />
                        <Form.Check type="checkbox" label="Tofu" />
                        <Form.Check type="checkbox" label="Salad" />                        
                    </Form.Group>
                    <Form.Group onChange={handleOrderChange} className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Protein</Form.Label>
                        <Form.Check value={bowl.protein} type="checkbox" label="Salmon" />
                        <Form.Check type="checkbox" label="Tuna" />
                        <Form.Check type="checkbox" label="Tofu" />                                               
                    </Form.Group>
                    <Form.Group onChange={handleOrderChange} className="mb-3" controlId="formBasicCheckbox">
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