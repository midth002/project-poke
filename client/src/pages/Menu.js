import React from "react";
import Auth from '../utils/auth'
import { useQuery } from "@apollo/client";

import StaffPicks from "../components/Staffpicks";
import Sides from "../components/Sides"
import Bevs from "../components/Drinks"

import { QUERY_STAFF_PICKS, QUERY_SIDES, QUERY_BEVS, QUERY_ALL_ORDERS } from "../utils/queries";

// import CreateBowlForm from '../components/CreateBowl'



const Menu = () => {
    const { loading: staffPicksLoading, data: staffPicksData } = useQuery(QUERY_STAFF_PICKS)
    const {loading: sidesLoading, data: sidesData} = useQuery(QUERY_SIDES)
    const {loading: bevsLoading, data: bevsData} = useQuery(QUERY_BEVS)
    const {loading: orderLoading, data: orderData} = useQuery(QUERY_ALL_ORDERS);
    console.log(staffPicksData, sidesData, bevsData, orderData)

    // const getOrder = async () => {
    //     const order = orderData?.allOrders || [];
    //     const orderResults = order;
    //     return orderResults[0]._id;
    // }

    // const orderString = await getOrder();
    // console.log("orderString", typeof orderString, orderString);

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
            <div>
                <div>
                {sidesLoading ? (
                    <div>Loading Sides and Drinks...</div>
                ): (
                    <div 
                    style={{float: 'right', position: 'relative', marginRight: 20}}
                    >
                        <div>
                            <h3>Sides</h3>
                            <hr/>
                            <Sides sides={sides} />
                            <br/>
                        </div>
                        <div>
                            <h3>Drinks</h3>
                            <hr/>
                            <Bevs bevs={bevs} />
                        </div>

                    </div>
                )}
                </div>
                <div>
                {/* <CreateBowlForm /> */}
                {!staffPicksLoading ? (
                    
                    <div style={{marginLeft: 10}}>
                        <h3>Poke Bowls</h3>
                        <hr/>
                        <StaffPicks key={staffpicks._id} staffpicks={staffpicks}/>
                    </div>
                ) : (
                    <div>Loading Menu...</div>
                )}
                </div>
                {/* <div><CreateBowlForm /></div> */}
                
            </div>
            
        </div>

    )
};

export default Menu;