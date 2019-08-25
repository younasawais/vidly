import React           from 'react';
import {getMovies}     from './db/fakeMovieService';
import {getGenres}     from './db/fakeGenreService';
import Nav             from './comps/nav.js';
import {BrowserRouter} from 'react-router-dom';

class App extends React.Component{
  constructor(props){
    super(props);
    this.onClickdeleteMovie = this.onClickdeleteMovie.bind(this);
    this.handleShowMovies   = this.handleShowMovies.bind(this);
    this.handleLike         = this.handleLike.bind(this);
    this.handleGenre        = this.handleGenre.bind(this);
    
    let genres = getGenres();
    this.state = {
      movies        : getMovies(),
      maxPerPage    : 5,
      displayMovies : getMovies(),
      initiate      : true,
      genres        : genres,
      currentPage   : 1 
    }
  }

  handleGenre(genre){
    let allMovies       = this.state.movies;
    let filteredMovies  = [];
    if (genre !== "All") {
      for (let i = 0; i < allMovies.length; i++) {
        if (allMovies[i].genre.name === genre) {
          filteredMovies.push(allMovies[i]);
        }
      }
    }else{
      for (let i = 0; i < allMovies.length; i++) {
          filteredMovies.push(allMovies[i]);
      }
    }

    this.setState({
      displayMovies : filteredMovies
    })
  }

  render(){
    return(
      <React.Fragment>
        <BrowserRouter>
          <Nav 
            genres={this.state.genres} 
            handleGenre={this.handleGenre}
            displayMovies={this.state.displayMovies}
            handleLike={this.handleLike}
            onClickdeleteMovie={this.onClickdeleteMovie}
            totalMovies={this.state.movies.length} 
            maxPerPage={this.state.maxPerPage} 
            handleShowMovies={this.handleShowMovies}
          />
        </BrowserRouter>
      </React.Fragment>
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
      initiate : false,
      currentPage : btnNr
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
    this.handleShowMovies(this.state.currentPage);
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