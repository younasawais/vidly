import React from 'react';

const SingleMoviePage = (props) => {
    const {match} = props;
    const {params} = match;
    
    return ( 
        <div className="container">
            <div className="row">
                <h2> 
                    Movie From {params.id}
                </h2>
                <button className="btn btn-primary">Save</button>
            </div>
        </div> 
        );
}
 
export default SingleMoviePage;