import React from 'react';

const style = {
    marginLeft : 5,
    marginRight : 5,
    marginTop : 5,
    marginBottom : 5,
}

const Calc = (props) => {


    return (
        <div className="Container col-sm-">
            <label style={style}>{props.total === 0 ? "Zero" : props.total}</label>
            <button 
                onClick={()=>{props.increaseBtn(props.id)}} 
                style={style} 
                className="btn btn-secondary">
                    +
            </button>
            <button
                onClick={()=>{props.decreaseBtn(props.id)}} 
                style={style} 
                className="btn btn-secondary"
                disabled={props.total === 0 ? 'disabled' : ''}
                >
                    -
            </button>12
            <button
                onClick={()=>{props.deleteBtn(props.id)}} 
                style={style} 
                className="btn btn-danger"
                >
                    x
            </button>
        </div>
    );
};

export default Calc;

