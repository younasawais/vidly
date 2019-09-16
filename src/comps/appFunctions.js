import React from 'react';
import {getMovies}     from '../db/fakeMovieService';
import {getGenres}     from '../db/fakeGenreService';
import Joi             from 'joi-browser';

class AppFunctions extends React.Component {
    constructor(props){
        super(props);
        this.onClickdeleteMovie = this.onClickdeleteMovie.bind(this);
        this.handleShowMovies   = this.handleShowMovies.bind(this);
        this.handleLike         = this.handleLike.bind(this);
        this.handleGenre        = this.handleGenre.bind(this);
        this.handleRegisterForm = this.handleRegisterForm.bind(this);
        this.handleSubmit       = this.handleSubmit.bind(this);
        this.handleSubmitMovie  = this.handleSubmitMovie.bind(this);
        this.handleSearch       = this.handleSearch.bind(this);
        
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
          showError     : "",
          searchBox     : "",
        }
    }

    handleSearch(e){
        let searchBox = e.currentTarget.value.toLowerCase();
        let movies = this.state.movies;
        let displayMovies = [];
        for (let i = 0; i < movies.length; i++) {
            if (movies[i]["title"].toLowerCase().includes(searchBox)) {
                displayMovies.push(movies[i]);
            } 
        }
        this.setState({
            searchBox       : searchBox,
            displayMovies   : displayMovies
        });
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
        if (!this.state.searchBox) {
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
 
export default AppFunctions;