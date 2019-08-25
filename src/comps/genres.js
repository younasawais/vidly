import React from 'react';

const Genres = (props) => {
    return(
        
        <div className="col-lg-3"> {/* Genres */}
        <ul className="list-group">
            <li key="All"
                className="list-group-item"
                onClick={()=>{props.handleGenre("All")}}
            >All</li>
            {props.genres.map(genre => (<li 
                key={genre.name} 
                className="list-group-item"
                onClick={()=>{props.handleGenre(genre.name)}}
                >{genre.name}</li> ))}
        </ul>
            </div>
    )
}
 
export default Genres;