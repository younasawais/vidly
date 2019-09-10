import React from 'react';

const RegisterPage = (props) => {
    const {handleRegisterForm, handleSubmit, account} = props;
    let hideButton = true;
    if (account["name"] !=="" && account["username"] !=="" && account["password"] !=="") {
        hideButton = false;
    }
    return ( 
        <React.Fragment>
            <div className="container">
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">UserName</label>
                        <input 
                            type="text" 
                            onChange={handleRegisterForm} 
                            className="form-control" 
                            name="username" 
                            id="username" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter username" 
                            value={account["userName"]} />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input 
                            type="password" 
                            onChange={handleRegisterForm} 
                            className="form-control" 
                            id="password" 
                            placeholder="Password" 
                            name="password" 
                            value={account["password"]}/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Name</label>
                        <input 
                            onChange={handleRegisterForm}
                            type="text" 
                            className="form-control" 
                            id="name" 
                            placeholder="Name" 
                            name="name" 
                            value={account["name"]}/>
                    </div>
                    <button 
                        type="submit"
                        onClick={handleSubmit}
                        className="btn btn-primary"
                        disabled={hideButton}>Submit
                    </button>
                    <br/><label for="exampleInputPassword1">{account["result"]}</label>
                </form>
            </div>
        </React.Fragment>
     );
};
 
export default RegisterPage;