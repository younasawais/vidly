import React           from 'react';
import {getMovies}     from './db/fakeMovieService';
import {getGenres}     from './db/fakeGenreService';
import Nav             from './comps/nav.js';
import {BrowserRouter} from 'react-router-dom';
import Joi             from 'joi-browser';

class App extends React.Component{
  constructor(props){
    super(props);
    this.onClickdeleteMovie = this.onClickdeleteMovie.bind(this);
    this.handleShowMovies   = this.handleShowMovies.bind(this);
    this.handleLike         = this.handleLike.bind(this);
    this.handleGenre        = this.handleGenre.bind(this);
    this.handleRegisterForm = this.handleRegisterForm.bind(this);
    this.handleSubmit       = this.handleSubmit.bind(this);
    
    let genres = getGenres();
    this.state = {
      movies        : getMovies(),
      maxPerPage    : 5,
      displayMovies : getMovies(),
      initiate      : true,
      genres        : genres,
      currentPage   : 1,
      account       : {username : "", password : "", name : "", result : ""}
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
            genres              = {this.state.genres} 
            handleGenre         = {this.handleGenre}
            displayMovies       = {this.state.displayMovies}
            handleLike          = {this.handleLike}
            onClickdeleteMovie  = {this.onClickdeleteMovie}
            totalMovies         = {this.state.movies.length}
            maxPerPage          = {this.state.maxPerPage} 
            handleShowMovies    = {this.handleShowMovies}
            handleRegisterForm  = {this.handleRegisterForm}
            handleSubmit        = {this.handleSubmit}
            account             = {this.state.account}
          />
        </BrowserRouter>
      </React.Fragment>
    )
  }




  handleRegisterForm(e){
    let value         = e.currentTarget.value;
    let name          = e.currentTarget.name;
    let account       = this.state.account;
    account[name]     = value;
    this.setState({
      account : account
    })
  }

  handleSubmit(e){
    e.preventDefault();
    const schema = Joi.object().keys({
      username : Joi.string().min(3).max(255).required(),
      password : Joi.string().min(3).max(255).required(),
      name     : Joi.string().min(3).max(255).required()
    });
    let { name, password, username} = this.state.account;
    const result = schema.validate({ username: username, password: password , name: name});
    let account = this.state.account;
    if(result.error === null){
      account["result"] = `name is ${name}, username is ${username} and password is ${password}`;
      this.setState({account : account});
    }else{
      account["result"] = `Something wend wrong`;
      this.setState({account : account});
    }
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