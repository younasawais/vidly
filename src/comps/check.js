import React from 'react';

const style = {
    marginLeft : 5,
    marginRight : 5,
    marginTop : 5,
    marginBottom : 5,
}

const Check = (props) => {
    return (
        <div className="Container col-sm-">           
            <button  style={style} onClick={()=>{props.passFunction(1)}} className="btn">Test</button>
        </div>
    );
};

export default Check;
