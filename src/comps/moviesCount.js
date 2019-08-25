import React from 'react';

const MoviesCount = (props) => { 
    return ( 
        <div className="row">
            <h2>Showing {props.displayMovies.length} movies in the DB</h2>
        </div>
     );
}

 
export default MoviesCount;