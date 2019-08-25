import React    from 'react';
import {Redirect, NavLink, Route, Switch} from 'react-router-dom';
import MoviesPage from "../pages/MoviesPage";
import RentalsPage from "../pages/RentalsPage";
import CustomersPage from "../pages/CustomersPage";
import NotFoundPage from "../pages/notFoundPage";
import SingleMoviePage from "../pages/singleMoviePage";


const Nav = (props) => {
    return ( 
        <nav className="nav">
            <nav className="nav">
                <NavLink className="nav-link nav-item" to="/movies">Movies</NavLink>
                <NavLink className="nav-link nav-item" to="/customers">Customers</NavLink>
                <NavLink className="nav-link nav-item" to="/rentals">Rentals</NavLink>
            </nav>
            <Switch>
                <Route 
                    path="/movies" 
                    render={()=><MoviesPage {...props}/>}
                />
                <Route 
                    path="/rentals" 
                    render={()=><RentalsPage {...props}/>}
                />
                <Route 
                    path="/customers" 
                    render={()=><CustomersPage {...props}/>}
                />
                <Route 
                    path="/notfound" 
                    render={()=><NotFoundPage {...props}/>}
                /> 
                <Route 
                    path="/singleMoviePage/:id" 
                    component={SingleMoviePage}
                /> 
                               
                <Route 
                    path="/" 
                    exact render={()=><MoviesPage {...props}/>}
                />
                <Redirect to="/notfound"/>
            </Switch>

        </nav>
     );
}
 
export default Nav;