import React        from 'react';
import {getMovies}  from './db/fakeMovieService';
import {getGenres}  from './db/fakeGenreService';
import Pagination   from './comps/pagination.js';
import Genres       from './comps/genres.js';

class App extends React.Component{
  constructor(props){
    super(props);
    this.onClickdeleteMovie = this.onClickdeleteMovie.bind(this);
    this.handleShowMovies   = this.handleShowMovies.bind(this);
    this.handleLike         = this.handleLike.bind(this);
    this.handleGenre        = this.handleGenre.bind(this);
    
    let genres = getGenres();
    this.state = {
      movies : getMovies(),
      maxPerPage : 5,
      displayMovies : getMovies(),
      initiate : true,
      genres : genres 
    }
  }

  handleGenre(genre){
    let allMovies       = this.state.movies;
    let filteredMovies  = [];

    for (let i = 0; i < allMovies.length; i++) {
        if (allMovies[i].genre.name === genre) {
          filteredMovies.push(allMovies[i]);
        }
    }
    console.log(filteredMovies);
    this.setState({
      displayMovies : filteredMovies
    })
  }

  render(){
    return(
      <div> 
        <h2>Showing {this.state.displayMovies.length} movies in the DB</h2>
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
            {this.state.displayMovies.map((movie) => 
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td onClick={()=>{this.handleLike(movie._id)}}><i 
                    className={movie.liked ? 'fa fa-heart-o' : 'fa fa-heart' }
                    aria-hidden={movie.liked ? "true" : "false" }></i>
                </td>
                <td>
                  <button 
                    onClick={()=>{this.onClickdeleteMovie(movie._id)}} 
                    className="btn btn-primary">Delete
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
        <Pagination 
          totalMovies={this.state.movies.length} 
          maxPerPage={this.state.maxPerPage} 
          handleShowMovies={this.handleShowMovies}
        />
        <Genres 
          genres={this.state.genres} 
          handleGenre={this.handleGenre}/>
      </div>
    )
  }



  handleShowMovies(btnNr){
    let allMovies   = this.state.movies;
    let maxPerPage  = this.state.maxPerPage;
    let displayMovies  = [];
    let start   = maxPerPage * (btnNr - 1);
    for (let i = start; i < (maxPerPage + start); i++) {
      if (typeof allMovies[i] !== "undefined") {
        displayMovies.push(allMovies[i]);
      }
    }
    this.setState({
      displayMovies : displayMovies,
      initiate : false
    })
  }
  
  onClickdeleteMovie(movieId){
    let temp = () =>{
      for (let i = 0; i < this.state.movies.length; i++) {
        if (this.state.movies[i]._id === movieId) {
          return i;
        }
      };
    }
    let start = temp();
    let movies = this.state.movies;
    movies.splice(start,1); 
    console.log('Movies delete : ' + movies);
    this.setState({
      movies : movies
    });
  }

  handleLike(id){
    let movies = this.state.movies;
    let start;
    for (let i = 0; i < this.state.movies.length; i++) {
      if (this.state.movies[i]._id === id) {
        start = i;
      };
    };
    movies[start].liked = !movies[start].liked;
    this.setState({
      movies : movies
    })
  }

  componentDidMount(){
    if (this.state.initiate) {
      this.handleShowMovies(1);
    }
  }
}

export default App;
