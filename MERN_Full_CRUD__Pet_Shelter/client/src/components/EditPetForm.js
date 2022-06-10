import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPetForm = (props) => {
    const history = useHistory();
    const [submitted, setSubmitted] = useState(false)
    const{_id} = useParams();
    const [pet, setPet] = useState({
        petName: "",
        petType: "",
        petDescription: "",
        skill1: "",
        skill2: "",
        skill3: ""
    })

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pet/${_id}`)
            .then(res => setPet(res.data))
            .catch(err => console.log(err))
    }, [_id])

    const formChange = (e) => {
        setPet({
            ...pet,
            [e.target.name]: e.target.value
        })
    }

    const validLength = (val, len) => {
        if(val.length < len){
            return false
        } else {
            return true
        }
    }

    const updatePet = (e) => {
        e.preventDefault();

        axios.patch(`http://localhost:8000/api/pet/${_id}/edit`, pet)
            .then(res => history.push("/"))
            .catch(err => console.log(err));

        setSubmitted(true);
    }

    return(
        <div className="w-75 mx-auto my-3">
            <form onSubmit={ updatePet }>
                <div className="d-flex">
                    <div className="w-50">
                    <div className="form-group my-2">
                            <label className="form-label">Pet Name:</label>
                            <input className="form-control" name="petName" onChange={formChange} type="text" value={pet.petName}/>
                            {!validLength(pet.petName, 3) && submitted && <span className="alert-danger">Pet Name must be 3 characters or longer</span>}
                        </div>
                        <div className="form-group my-2">
                            <label className="form-label">Pet Type:</label>
                            <input className="form-control" name="petType" onChange={formChange} type="text" value={pet.petType}/>
                            {!validLength(pet.petType, 3) && submitted && <span className="alert-danger">Pet Type must be 3 characters or longer</span>}
                        </div>
                        <div className="form-group my-2">
                            <label className="form-label">Pet Description:</label>
                            <input className="form-control" name="petDescription" onChange={formChange} type="text" value={pet.petDescription}/>
                            {!validLength(pet.petDescription, 3) && submitted && <span className="alert-danger">Pet Description must be 3 characters or longer</span>}
                        </div>
                        
                        <input type="submit" value="➕ Update Pet" className="btn btn-success w-100 my-2"/>
                    </div>
                    <div className="w-50 form-group p-2">
                        <p className="form-label">Skills (optional):</p>
                        <div className="form-group my-2 p-1">
                            <label className="form-label">Skill 1:</label>
                            <input className="form-control" name="skill1" onChange={formChange} type="text" value={pet.skill1}/>
                        </div>
                        <div className="form-group my-2 p-1">
                            <label className="form-label">Skill 2:</label>
                            <input className="form-control" name="skill2" onChange={formChange} type="text" value={pet.skill2}/>
                        </div>
                        <div className="form-group my-2 p-1">
                            <label className="form-label">Skill 3:</label>
                            <input className="form-control" name="skill3" onChange={formChange} type="text" value={pet.skill3}/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditPetForm;