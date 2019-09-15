import React from 'react';
import Pagination                           from '../comps/pagination.js';
import Genres                               from '../comps/genres.js';
import Movies                               from '../comps/movies.js';
import MoviesCount                          from '../comps/moviesCount.js'
import {Link}                               from 'react-router-dom';

const MoviesPage = (props) => {
    const {displayMovies, genres, handleGenre,   
        handleLike, onClickdeleteMovie, totalMovies, maxPerPage, handleShowMovies } = props;
    return ( 
        <React.Fragment>
            <div className="container">
                <div className="row"> 
                    <Genres 
                        genres={genres} 
                        handleGenre={handleGenre}/>
                    <div className="col-lg-9">
                        <Link  type="button" className="btn btn-primary" to="/movies/new">New Movie</Link>
                        <MoviesCount displayMovies={displayMovies}/>
                        <Movies 
                            displayMovies={displayMovies}
                            handleLike={handleLike}
                            onClickdeleteMovie={onClickdeleteMovie}
                        />
                        <Pagination 
                            totalMovies={totalMovies} 
                            maxPerPage={maxPerPage} 
                            handleShowMovies={handleShowMovies}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
     );
};
 
export default MoviesPage;