import React from "react";
import {Link} from "react-router-dom";

import PetList from "../components/PetList";

const Main = (props) => {
    return(
        <div className="">
            <h3>These pets are looking for a good home</h3>
            <PetList/>
        </div>
    )
}

export default Main;