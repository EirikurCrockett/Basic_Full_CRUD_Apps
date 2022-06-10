import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';


const PetDetails = (props) => {
    const history = useHistory();
    const [pet, setPet] = useState({
        petName: "",
        petType: "",
        petDescription: "",
        skill1: "",
        skill2: "",
        skill3: ""
    })

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pet/${props._id}`)
            .then(res => setPet(res.data))
            .catch(err => console.log(err))
    }, [props._id])

    const onAdopt = () =>{
        axios.delete(`http://localhost:8000/api/pet/${props._id}/delete`)
            .then(res => history.push("/"))
            .catch(err => console.log(err))
    }

    return(
        <div className="card w-50 mx-auto my-3">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h3 className="card-title">{pet.petName}</h3>
                    <button onClick={()=>{onAdopt()}} className="btn btn-danger">🏠 Adopt {pet.petName}</button>
                </div>
                <p className="card-text">Pet type: {pet.petType}</p>
                <p className="card-text">Description: {pet.petDescription}</p>
                <p className="card-text">Skills:</p>
                <ul>
                    {pet.skill1 != ""? <li>{pet.skill1}</li> : <></>}
                    {pet.skill2 != ""? <li>{pet.skill2}</li> : <></>}
                    {pet.skill3 != ""? <li>{pet.skill3}</li> : <></>}
                </ul>
            </div>
        </div>
    )
}

export default PetDetails; 