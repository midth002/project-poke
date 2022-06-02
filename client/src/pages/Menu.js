import React from "react";

import { useQuery } from "@apollo/client";

import StaffPicks from "../components/Staffpicks";
import Sides from "../components/Sides"
import Bevs from "../components/Drinks"

import { QUERY_STAFF_PICKS, QUERY_SIDES, QUERY_BEVS } from "../utils/queries";

import CreateBowlForm from '../components/CreateBowl'



const Menu = () => {
    const { loading: staffPicksLoading, data: staffPicksData } = useQuery(QUERY_STAFF_PICKS)
    const {loading: sidesLoading, data: sidesData} = useQuery(QUERY_SIDES)
    const {loading: bevsLoading, data: bevsData} = useQuery(QUERY_BEVS)
    console.log(staffPicksData, sidesData, bevsData)

    const staffpicks = staffPicksData?.allStaffPicks || [];
    const sides = sidesData?.allSides || []
    const bevs = bevsData?.allBevs || []
    return (
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
                {staffPicksLoading ? (
                    <div>Loading Menu...</div>
                ) : (
                    <div 
                    style={{marginLeft: 10}}
                    >
                        <h3>Poke Bowls</h3>
                        <hr/>
                        <StaffPicks staffpicks={staffpicks}/>
                    </div>
                )}
                </div>
                <CreateBowlForm />
            </div>

    )
};

export default Menu;