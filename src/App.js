import React, { Component } from 'react';
import Header from "./components/Header/Header.jsx";
import Movies from "./components/Movies/Movies.jsx";
import Pagination from './components/Pagination/Pagination.jsx'
import axios from 'axios';
import { API_URL, API_KEY } from './API/secrets.jsx';
import './App.css'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Favourite from "./components/Favourite/Favourite.jsx";
import Moviepage from './components/Moviepage/Moviepage.jsx';



class App extends Component {
  state = { 
    moviesData: [],
    currentMovie: "Avengers",
    pages: [], 
    currentPage: 1
   } 

  componentDidMount(){
    // API call
    // parameters => api Key, query, pageNumber
    // https://api.themoviedb.org/3/search/movie?api_key=4541f97245b87666e6d4c43eb802c4af&query=batman&page=1
    axios.get( API_URL + "/search/movie", {params :{
      api_key : API_KEY,
      query: this.state.currentMovie,
      page : 1
    }} )
    .then((data) =>{
      // console.log(data)
      let updatedMoviesData = data.data.results.slice(0, 12);
      let totalPagesCount = data.data.total_pages;
      let pages = [];
      for(let i = 1; i <= totalPagesCount; i++){
        pages.push(i);
      }
      // console.log(pages);
      this.setState({
        moviesData : updatedMoviesData,
        pages: pages
      })
    })
  }

  setMovies = async(searchedMovieName) => {
      let data = await axios.get( API_URL + "/search/movie", {params: {
      api_key: API_KEY,
      query: searchedMovieName,
      page: 1
    }});

    let updatedMoviesData = data.data.results.slice(0,12);
    let totalPagesCount = data.data.total_pages;
    let pages = [];
    for(let i = 1; i <= totalPagesCount; i++){
      pages.push(i);
    }
    this.setState({ 
      moviesData: updatedMoviesData,
      currentMovie: searchedMovieName,
      pages: pages 
    })  
  }

  previousPage = async() =>{
    let data = await axios.get( API_URL + "/search/movie", {params: {
      api_key: API_KEY,
      query: this.state.currentMovie,
      page: this.state.currentPage - 1
    }});

    let updatedMoviesData = data.data.results.slice(0,12);
    this.setState({ 
      moviesData: updatedMoviesData,
      currentPage: this.state.currentPage - 1
    })
  }

  setPage = async(pageCount) =>{
    let data = await axios.get( API_URL + "/search/movie", {params: {
      api_key: API_KEY,
      query: this.state.currentMovie,
      page: pageCount
    }});

    let updatedMoviesData = data.data.results.slice(0,12);
    this.setState({ 
      moviesData: updatedMoviesData,
      currentPage: pageCount
    })
  }
  nextPage = async() =>{
    let data = await axios.get( API_URL + "/search/movie", {params: {
      api_key: API_KEY,
      query: this.state.currentMovie,
      page: this.state.currentPage+1
    }});

    let updatedMoviesData = data.data.results.slice(0,12);
    this.setState({ 
      moviesData: updatedMoviesData,
      currentPage: this.state.currentPage+1
    })
  }



  render() { 
    let moviesData= this.state.moviesData;
    let setMovies = this.setMovies;
    let pages = this.state.pages;
    let currentPage = this.state.currentPage;
    let previousPage = this.previousPage;
    let setPage = this.setPage;
    let nextPage = this.nextPage;

    return (
      <Router>
        <div className ="App">
          <Header setMovies = {setMovies}></Header>
          <Switch>
            {/* Home Page */} 
            <Route path = "/" exact>
            {this.state.moviesData.length ?(
              <React.Fragment>
                <Movies movies = {moviesData}></Movies>
                <Pagination 
                  pages= {pages}
                  currentPage= {currentPage}
                  previousPage= {previousPage}
                  setPage ={setPage}
                  nextPage ={nextPage}
                ></Pagination>
              </React.Fragment>
            ):(
                <h1>Oops no movie found</h1>
            )}
            </Route>

            {/* Favourite Page */}
              <Route path="/favourites" exact component={Favourite}></Route>
              <Route path="/moviepage" exact component ={Moviepage}></Route>
          </Switch>
        </div>
     </Router>
   
    );
  }
}
 
export default App;