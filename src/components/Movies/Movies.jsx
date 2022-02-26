import React, { Component } from 'react';
import Movie from "../Movie/Movie";
import './Movies.css'


class Movies extends Component {
    state = {  } 
    render() { 
        return (
            <div className="movies">
                <div className="movies-container">
                    {this.props.movies.map ( (movieObject)=>{
                    return (
                    <Movie key ={movieObject.id} movieObject = {movieObject} ></Movie>)
                }) }
                </div>
               
            </div> 
        );
    }
}
 
export default Movies;