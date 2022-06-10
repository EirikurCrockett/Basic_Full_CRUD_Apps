import React from "react";
import { useParams } from "react-router-dom";

import PetDetails from "../components/PetDetails";

const PetDetailPage = (props) => {
    const {_id} = useParams();
    
    return(
        <div>
            <PetDetails _id={_id}/>
        </div>
    )
}

export default PetDetailPage;