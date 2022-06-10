import '../node_modules/bootstrap/dist/css/bootstrap.css'
import {Switch, Route, Link} from 'react-router-dom';

import Main from './views/Main';
import EditPetPage from './views/EditPetPage';
import AddPetPage from './views/AddPetPage'
import PetDetailPage from './views/PetDetailsPage';


function App() {
    return (
        <div className="mx-auto my-0 w-75">
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark border p-3">
                <h1 className="navbar-brand">Pet Shelter</h1>
                <div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/pet/add">Add Pet</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Switch>
                <Route exact path = "/">
                    <Main/>
                </Route>
                <Route exact path = "/pet/add">
                    <AddPetPage/>
                </Route>
                <Route exact path = "/pet/:_id/edit">
                    <EditPetPage/>
                </Route>
                <Route exact path = "/pet/:_id/details">
                    <PetDetailPage/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
