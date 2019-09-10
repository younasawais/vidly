import React from 'react';

const LoginPage = () => {
    return ( 
        <div className="container">
            <form>
                <h1>Login</h1>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter Username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div> 
    );
}
 
export default LoginPage;