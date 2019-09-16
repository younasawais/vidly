import React           from 'react';
import Nav             from './comps/nav.js';
import {BrowserRouter} from 'react-router-dom';
import AppFunctions    from './comps/appFunctions';

class App extends AppFunctions{

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
            handleSearch        = {this.handleSearch}
          />
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

export default App;