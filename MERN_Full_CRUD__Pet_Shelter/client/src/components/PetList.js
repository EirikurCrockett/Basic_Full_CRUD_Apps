import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PetList = (props) => {
    const [pets, setPets] = useState([]);

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/pet/all`)
            // .then(res => console.log(res))
            .then(res => setPets(res.data))
            .catch(err => console.log(err))
    },[])

    return(
        <div className="mx-auto my-3 w-50 p-3">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pets.map((item,i)=>
                            <tr key={i}>
                                <th scope="row">{i+1}</th>
                                <td>{item.petName}</td>
                                <td>{item.petType}</td>
                                <td>
                                    <Link to={`/pet/${item._id}/details`} className='mx-2'>Details</Link>
                                    |
                                    <Link to={`/pet/${item._id}/edit`} className='mx-2'>Edit</Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PetList;