/*
  - Add Button above showing x movies revering to /movies/new
  - Create form to add new movie
    - input Genre should show all genres to select from
    - input 'number in stock' allows 1 - 100
    - rate 1 - 5
  - Save is disabled until all are filled in
  - when saved, movie is added into db & shows in list
  - note: movies are added & deleted from state, not the db
  - when selecting a movie, current data should be able to modify (with id in link)
  - when invalid link -> not found page
  - When pressing back from 'not found' go to movie form of terminator
*/
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
    this.handleSubmitMovie  = this.handleSubmitMovie.bind(this);
    
    let genres = getGenres();
    this.state = {
      movies        : getMovies(),
      newMovie      : {title: "", genre:"", stock: "", rate: ""},
      maxPerPage    : 5,
      displayMovies : getMovies(),
      initiate      : true,
      genres        : genres,
      currentPage   : 1,
      account       : {username: "", password: "", name: "", result: ""},
      showError     : ""
    }
  }

  handleSubmitMovie(newMovie){
    let movies = this.state.movies;

    if (newMovie.modify) {
      let index = 0;
      for (let i = 0; i < movies.length; i++) {
        if (movies[i]["_id"] === newMovie.id) {
            index = i;
            break;
        }
      }
      movies[index].title             = newMovie.title;
      movies[index]["genre"]["name"]  = newMovie.genre;
      movies[index].numberInStock     = newMovie.stock;
      movies[index].dailyRentalRate   = newMovie.rate;
    } else {
      let id = newMovie.title + newMovie.genre;
      let newMovieVal = {
        title : newMovie.title,
        genre : {
          _id : "5b21ca3eeb7f6fbccd471818",
          name : newMovie.genre
        },
        numberInStock : newMovie.stock,
        dailyRentalRate  : newMovie.rate,
        liked : false,
        _id   : id,
      }
      movies.push(newMovieVal);
    }

    this.setState({movies : movies});
    //console.log("runned" + newMovie);
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
            handleSubmitMovie   = {this.handleSubmitMovie}
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
    this.handleShowMovies(1);
  }
}

export default App;