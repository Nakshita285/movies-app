import React, { Component } from 'react';
import {API_URL, IMG_URL, API_KEY, IMG_URL_PREFIX} from '../../API/secrets';
import './Movie.css'
import { Link} from "react-router-dom";
import axios from "axios";

class Movie extends Component {
    state = { 
        detailedMovieObject: {}
     } 
    
    async componentDidMount() {
        // use axios for get movie by id 
        // https://api.themoviedb.org/3/movie/100?api_key=4541f97245b87666e6d4c43eb802c4af
        
        let response = await axios.get(`${API_URL}/movie/${this.props.movieObject.id}?api_key=${API_KEY}`);
        let posterPath = IMG_URL_PREFIX + this.props.movieObject.poster_path;
        let detailedMovieOBJ = response.data;
        // console.log(posterPath);
        // console.log(response.data); 
        this.setState({
            detailedMovieObject: { ...detailedMovieOBJ , poster_path: posterPath }
        })
    }
    render() { 
        let {title, poster_path, vote_average} = this.props.movieObject;
        let posterPath = IMG_URL + poster_path;
        return (
            <div className ="movie">
                <div className="movie-img">
                <Link to={{ pathname: '/moviepage', state: { data: this.state.detailedMovieObject } }}>
                    <img src ={posterPath} alt="avengers.img" />
                </Link>
                </div>
                <div className ="movie-content">
                    <div className ="movie-title">{title}</div>
                    <div className ="movie-votes">{ vote_average}  IMDB</div>
                </div>  
            </div>
        );
    }
}
 
export default Movie;