import React, {Component} from 'react';
import {getMovies}        from '../db/fakeMovieService';
import {Link}             from 'react-router-dom';

class AddMoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id              : "",
            title           : "",
            genre           : "",
            stock           : 0,
            rate            : 0,
            showError       : "",
            displayMovies   : getMovies(),
            modify          : false
         }
        this.handleAddMovie         = this.handleAddMovie.bind(this);
    }

    handleAddMovie(e){
        let state           = this.state;
        const value         = e.currentTarget.value;
        state[e.currentTarget.name] = value;
        this.setState(state);
    }

    componentDidMount(){
        const movies = this.state.displayMovies;
        let id;

        try {
            id = this.props.match.params.id;
            let index = 0;
            for (let i = 0; i < movies.length; i++) {
                if (movies[i]["_id"] === id) {
                    index = i;
                    break;
                }
            }
            this.setState({
                id    : this.props.match.params.id,
                title : movies[index]["title"],
                genre : movies[index]["genre"]["name"],
                stock : movies[index]["numberInStock"],
                rate  : movies[index]["dailyRentalRate"],
                modify: true
            })
        } catch (error) {
            console.log("Params not defined, perhaps new movie is been added");
        }
    }

    render() { 
        const {handleAddMovie}                                      = this;
        const {showError, title, genre, rate, stock, modify, id}    = this.state;
        let hideButton = true;
        if (title !=="" && genre !=="" && stock !==""  && rate !=="") {
            hideButton = false;
        }
        return ( 
            <React.Fragment>
                <div className="container">
                    <h1> Movie Form </h1>
                    <form>
                        <div className="form-group">
                            <input 
                                type="text" 
                                onChange={handleAddMovie} 
                                className="form-control" 
                                name="title" 
                                id="title" 
                                placeholder="Title" 
                                value={title} />
                            <label>Genre</label>
                            <input 
                                type="genre" 
                                onChange={handleAddMovie} 
                                className="form-control" 
                                id="genre" 
                                placeholder="genre" 
                                name="genre" 
                                value={genre}/>
                            <label>Number in Stock</label>
                            <input 
                                onChange={handleAddMovie}
                                type="text" 
                                className="form-control" 
                                id="stock" 
                                placeholder="stock" 
                                name="stock" 
                                value={stock}/>
                            <label>Rate</label>
                            <input 
                                onChange={handleAddMovie}
                                type="text" 
                                className="form-control" 
                                id="rate" 
                                placeholder="rate" 
                                name="rate" 
                                value={rate}/>
                            <Link  
                                type="button" 
                                className="btn btn-primary" 
                                to="/movies"
                                onClick={() =>{this.props.handleSubmitMovie({
                                    title : title,
                                    genre : genre,
                                    stock : stock,
                                    rate  : rate,
                                    modify: modify,
                                    id    : id
                                })}}
                                disabled={hideButton}>Submit
                            </Link>
                            <br/><label>{showError}</label>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}
 
export default AddMoviePage;

    // validate(){
    //     let {title, genre, stock, rate} = this.state;
    //     const input         = {title : title, genre : genre, stock : stock, rate : rate };

    //     const schema = Joi.object()({
    //         title : Joi.string().alphanum().min(3).max(255).required(),
    //         genre : Joi.string().alphanum().min(3).max(255).required(),
    //         stock : Joi.number().integer().min(0).max(100).required(),
    //         rate  : Joi.number().min(1).max(10).required()
    //       });        

    //     try {
    //         const result = schema.validate(input);
    //         console.log("result : " + result);
    //         return true;
    //     } catch (error) {
    //         console.log("error : " + error);
    //         return false;
    //     }
    // }