import React from 'react';
import {getMovies, deleteMovie } from './db/fakeMovieService';

class App extends React.Component{
  constructor(props){
    super(props);
    this.onClickdeleteMovie = this.onClickdeleteMovie.bind(this);
    this.state = {
      // movies : getMovies()
      movies : [1,32,4]
    }
  }

    async onClickdeleteMovie(movieId){
    let temp = await deleteMovie(movieId);
    console.log(temp);
    if (temp) {
      this.setState({
        movies : temp
      });
    }
  }

  render(){
    console.log('checking');
    return(
      <div>
        <h2>Showing {this.state.movies.length} movies in the DB</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
            </tr>
          </thead>{/*
          <tbody>
             {this.state.movies.map((movie) => 
              <tr>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td><button onClick={this.onClickdeleteMovie(movie._id)} className="btn btn-primary">Delete</button></td>
              </tr>)} 
          </tbody>*/}
        </table>
      </div>
    )
  }
}

export default App;
