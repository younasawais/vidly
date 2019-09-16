import React from 'react';
import {Link} from 'react-router-dom';

const Movies = (props) => {
    const {displayMovies,  handleLike, onClickdeleteMovie}  = props;
    return ( 
      <React.Fragment>
      <table className="table">

      <thead>
         <tr>
           <th scope="col">Title</th>
           <th scope="col">Genre</th>
           <th scope="col">Stock</th>
           <th scope="col">Ratee</th> 
         </tr>
       </thead>
        <tbody>
          {displayMovies.map((movie) => 
          <tr key={movie._id}>
            <td><Link to={'/singleMoviePage/' + movie._id} >{movie.title}</Link>
            </td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td onClick={()=>{handleLike(movie._id)}}><i 
                className={movie.liked ? 'fa fa-heart-o' : 'fa fa-heart' }
                aria-hidden={movie.liked ? "true" : "false" }></i>
            </td>
            <td>
              <button 
                onClick={()=>{onClickdeleteMovie(movie._id)}} 
                className="btn btn-primary">Delete
              </button>
            </td>
          </tr>)}
        </tbody>
      </table>
      </React.Fragment>

     );
}
export default Movies;