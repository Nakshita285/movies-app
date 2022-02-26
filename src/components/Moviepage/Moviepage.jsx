import "./Moviepage.css"
import React, { Component } from 'react';
import axios from 'axios';
import {API_URL, API_KEY} from '../../API/secrets';
import YouTube from "react-youtube";

class Moviepage extends Component {
    state = { 
        movieObject : {}
     } 

    async componentDidMount() {
        let {id } = this.props.location.state.data;
        // https://api.themoviedb.org/3/movie/299534/videos?api_key=4541f97245b87666e6d4c43eb802c4af&language=en-US
        let response = await axios.get(`${API_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);

        // "site": "YouTube",  "type": "Trailer",
        let videoObject = response.data.results.filter((movieObject)=>{ 
            if(movieObject.type == "Trailer" && movieObject.site == "YouTube") {
                return true;
            }
            return false;
        })
        let movieObj = videoObject[0];
        this.setState({
            movieObject: movieObj
        }) 
    }
    render() { 

        let {poster_path, title, overview, vote_average} = this.props.location.state.data;
        const opts = {
            height: "100%",
            width: '100%',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            }
        };
        return (
            <div className="moviepage-container">
                <div className="moviepage-poster">
                    <img src={poster_path} alt="" />
                </div>
                <div className="moviepage-desc">
                    <div className="moviepage-title">
                        <h1>{title}</h1> 
                        <p className="moviepage-imdb">{vote_average} IMDB</p>
                    </div>
                    <div className="moviepage-overview">
                        <p>{overview}</p>
                    </div>
                </div>
                <div className="moviepage-trailer">
                    <YouTube videoId={this.state.movieObject.key} opts={opts} onReady={this._onReady} />
                </div>
            </div>
        );
    }
    _onReady(event) {
        console.log(event);
      }
}


export default Moviepage;