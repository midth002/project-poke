import React from "react";
import Auth from '../utils/auth'
import { useQuery } from "@apollo/client";

import StaffPicks from "../components/Staffpicks";
import Sides from "../components/Sides"
import Bevs from "../components/Drinks"

import { QUERY_STAFF_PICKS, QUERY_SIDES, QUERY_BEVS, QUERY_ALL_ORDERS } from "../utils/queries";

import './menu.css';
import {Col, Row} from 'react-bootstrap';




const Menu = () => {
    const { loading: staffPicksLoading, data: staffPicksData } = useQuery(QUERY_STAFF_PICKS);
    const {loading: sidesLoading, data: sidesData} = useQuery(QUERY_SIDES);
    const {loading: bevsLoading, data: bevsData} = useQuery(QUERY_BEVS);    

    const staffpicks = staffPicksData?.allStaffPicks || [];
    const sides = sidesData?.allSides || [];
    const bevs = bevsData?.allBevs || [];

    return (
        <div>
            {Auth.loggedIn() ? (
                null
            ) : (
                <h5 style={{ marginLeft: 10, textAlign: 'center' }}>Please Log In To Place Online Order</h5>
            )}
            <Row className="wrap" lg={2} md={1} sm={1} xs={1}>
                <Col className="bowl_col">
                    {!staffPicksLoading ? (
                        <StaffPicks key={staffpicks._id} staffpicks={staffpicks} />
                    ) : (
                        <div>Loading Menu...</div>
                    )}
                </Col>
                <Col className="side_col">
                    {sidesLoading ? (
                        <div>Loading Sides and Drinks...</div>
                    ) : (
                        <>
                            <Sides sides={sides} />
                            <Bevs bevs={bevs} />
                        </>
                    )}
                </Col>
            </Row>
        </div>
    )
};

export default Menu;