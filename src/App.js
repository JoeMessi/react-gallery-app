import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import { Provider } from './Components/Context';
import Header from './Components/Header';
import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';
import Gallery from './Components/Gallery';
import apiKey from './config';



export default class App extends Component {

    state = {
      searchImages: [],
      defaultDogs: [],
      defaultCats: [],
      defaultMonkeys: []
    }


  // IIFEs for defaults
  componentDidMount() {
      (() => {
         axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dog&per_page=24&format=json&nojsoncallback=1`)
           .then(response => {
             this.setState({
               defaultDogs: response.data.photos.photo
             })
           })
           .catch(error => {
             console.log('Error fetching and parsing the data', error)
           })
       })();

       (() => {
          axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cat&per_page=24&format=json&nojsoncallback=1`)
            .then(response => {
              this.setState({
                defaultCats: response.data.photos.photo
              })
            })
            .catch(error => {
              console.log('Error fetching and parsing the data', error)
            })
        })();

        (() => {
           axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=monkey&per_page=24&format=json&nojsoncallback=1`)
             .then(response => {
               this.setState({
                 defaultMonkeys: response.data.photos.photo
               })
             })
             .catch(error => {
               console.log('Error fetching and parsing the data', error)
             })
         })();
  }


  handleFeatching = (tag) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          searchImages: response.data.photos.photo
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing the data', error)
      })
  }





  render() {
    return (
      <BrowserRouter>
          <Provider value={{
            searchImages: this.state.searchImages,
            defaultCats: this.state.defaultCats,
            defaultDogs: this.state.defaultDogs,
            defaultMonkeys: this.state.defaultMonkeys,

            actions: {
              handleFeatching: this.handleFeatching
            }
          }}>
            <div>
               <Header />
               <Route component={ SearchForm } />
               <Nav />
               <Route path="/:tag" component={ Gallery } />
{/*
  <Route path="/dogs" render={ () => <Gallery data={this.state.defaultDogs} results="Dogs" /> } />
  <Route path="/cats" render={ () => <Gallery data={this.state.defaultCats} results="Cats" /> } />
  <Route path="/monkeys" render={ () => <Gallery data={this.state.defaultMonkeys} results="Monkeys" /> } />
  */}
            </div>
          </Provider>
      </BrowserRouter>
    );
  }


}
