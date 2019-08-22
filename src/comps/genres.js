import React from 'react';

const Genres = (props) => {
    return(
        <ul className="list-group">
            {props.genres.map(genre => (<li 
                key={genre.name} 
                className="list-group-item"
                onClick={()=>{props.handleGenre(genre.name)}}
                >{genre.name}</li> ))}
        </ul>
    )
}
 
export default Genres;