import React                                from 'react';
import {Redirect, NavLink, Route, Switch}   from 'react-router-dom';
import MoviesPage                           from "../pages/MoviesPage";
import RentalsPage                          from "../pages/RentalsPage";
import CustomersPage                        from "../pages/CustomersPage";
import NotFoundPage                         from "../pages/notFoundPage";
//import SingleMoviePage                      from "../pages/singleMoviePage";
import LoginPage                            from "../pages/loginPage";
import RegisterPage                         from "../pages/RegisterPage.jsx";
import AddMoviePage                         from "../pages/addMoviePage.jsx";


const Nav = (props) => {
    return ( 
        <nav className="nav container">
            <nav className="nav">
                <NavLink className="nav-link nav-item" to="/movies">Movies</NavLink>
                <NavLink className="nav-link nav-item" to="/customers">Customers</NavLink>
                <NavLink className="nav-link nav-item" to="/rentals">Rentals</NavLink>
                <NavLink className="nav-link nav-item" to="/login">Login</NavLink>
                <NavLink className="nav-link nav-item" to="/register">Register</NavLink>
            </nav>
            <Switch>      
                <Route 
                    exact path="/movies/new"
                    render={()=><AddMoviePage {...props}/>}
                /> 
                <Route 
                    exact path="/movies" 
                    render={()=><MoviesPage {...props}/>}
                />
                <Route   
                    exact path="/rentals" 
                    render={()=><RentalsPage {...props}/>}
                />
                <Route 
                    exact path="/customers" 
                    render={()=><CustomersPage {...props}/>}
                />
                <Route 
                    exact path="/notfound" 
                    render={()=><NotFoundPage {...props}/>}
                /> 
                <Route 
                    exact path="/singleMoviePage/:id" 
                    render={({ 
                        location, 
                        match 
                    }) =><AddMoviePage {...props} match={match}/>}
                /> 
                <Route 
                    exact path="/login/" 
                    component={LoginPage}
                />   
                <Route 
                    exact path="/register/" 
                    render={()=><RegisterPage {...props}/>}
                />        
                <Route 
                    exact path="/" 
                    render={()=><MoviesPage {...props}/>}
                />
                <Redirect to="/notfound"/>
            </Switch>
        </nav>
     );
}
 
export default Nav;