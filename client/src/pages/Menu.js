import React from "react";
import Auth from '../utils/auth'
import { useQuery } from "@apollo/client";

import StaffPicks from "../components/Staffpicks";
import Sides from "../components/Sides"
import Bevs from "../components/Drinks"

import { QUERY_STAFF_PICKS, QUERY_SIDES, QUERY_BEVS } from "../utils/queries";

// import CreateBowlForm from '../components/CreateBowl'

import {Col, Row} from 'react-bootstrap';
import './menu.css';



const Menu = () => {
    const { loading: staffPicksLoading, data: staffPicksData } = useQuery(QUERY_STAFF_PICKS)
    const {loading: sidesLoading, data: sidesData} = useQuery(QUERY_SIDES)
    const {loading: bevsLoading, data: bevsData} = useQuery(QUERY_BEVS)
    // console.log(staffPicksData, sidesData, bevsData)

    const staffpicks = staffPicksData?.allStaffPicks || [];
    const sides = sidesData?.allSides || []
    const bevs = bevsData?.allBevs || []
    return (
        <div>
            {Auth.loggedIn()?(
                null
                ):(
                <h5 style={{marginLeft:10}}>Please Log In To Place Online Order</h5>
            )}
            <Row className="wrap" lg={2} md={2} sm={1} xs={1}>
                <Col className="bowl_col">                
                {!staffPicksLoading ? (
                    <StaffPicks key={staffpicks._id} staffpicks={staffpicks}/>                    
                ) : (
                    <div>Loading Menu...</div>
                )}
                </Col>
                <Col className="side_col">
                {sidesLoading ? (
                    <div>Loading Sides and Drinks...</div>
                ): (
                    <div>                                                   
                            <Sides sides={sides} />                                                                
                            <Bevs bevs={bevs} />
                    </div>
                )}
                </Col>           
            </Row>            
        </div>
    )
};

export default Menu;