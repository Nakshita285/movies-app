import React, { Component } from 'react';
import './Header.css'
import {Link} from "react-router-dom";

class Header extends Component {
    state = { 
        inputMovie:""
     } 


    onHandleChange =(e) =>{
        let inputMovie = e.target.value;
        this.setState({ 
            inputMovie: inputMovie
        })
    }

    onKeyPress = async(e) => {
        if(e.key == "Enter"){
            this.props.setMovies(this.state.inputMovie);
            this.setState({ 
                inputMovie: ""
            })
        }
    }

    onClickFunc = async(e) => {
        this.props.setMovies(this.state.inputMovie);
        this.setState({
            inputMovie: ""
        })
    }

    render() { 
        let inputMovie = this.state.inputMovie;
        let onHandleChange = this.onHandleChange;
        let onKeyPress = this.onKeyPress;
        let onClickFunc = this.onClickFunc;
        return (
            <div className="header">
                <div className="logoContainer">
                    <img src ="./logo.svg" alt="logo.svg" />
                </div>

                <div className="functionality">

                    {/* Header Links */}
                    <div className ="header-links">
                        <div className="header-link">
                            <Link to="/">Home</Link>
                        </div>
                        <div className ="header-link">
                            <Link to="/favourites">Favourites</Link>
                        </div>
                    </div>

                    {/* Search Box */}
                    <div className ="searchBox">
                        <input type="text" 
                        placeholder="Search here..." 
                        value={inputMovie} 
                        onKeyPress={onKeyPress}
                        onChange={onHandleChange}/>
                        <img src ="./search.png" alt="search" onClick={onClickFunc}/>
                    </div>
                </div>    
            </div>    
        );
    }
}
 
export default Header;