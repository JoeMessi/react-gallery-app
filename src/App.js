import React, { Component } from 'react';
import axios from 'axios';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Provider } from './Components/Context';
import Header from './Components/Header';
import Gallery from './Components/Gallery';
import NotFound from './Components/NotFound';
import apiKey from './config';



export default class App extends Component {

    state = {
      searchImages: [],
      defaultDogs: [],
      defaultCats: [],
      defaultMonkeys: [],
      loading: null
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


         const url = this.props.location.pathname;

         if(url.includes('/search')) {
           let query = url.slice(8);

           this.handleFeatching(query);
           console.log('on componentDidMount');
         }
  }



  handleFeatching = (query) => {

    this.setState({
      loading: true
    })

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          searchImages: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing the data', error)
      })
  }




  render() {
    return (

      <Provider value={{
        searchImages: this.state.searchImages,
        defaultCats: this.state.defaultCats,
        defaultDogs: this.state.defaultDogs,
        defaultMonkeys: this.state.defaultMonkeys,

        actions: {
          handleFeatching: this.handleFeatching
        }
      }}>
      <div className="container">
      <Route component={ Header } />
      <Switch>
         <Route exact path="/" render={ () => <Redirect to="/cats" /> } />
         <Route path="/cats" render={ () => <Gallery data={this.state.defaultCats} results="Cats" /> } />
         <Route path="/dogs" render={ () => <Gallery data={this.state.defaultDogs} results="Dogs" /> } />
         <Route path="/monkeys" render={ () => <Gallery data={this.state.defaultMonkeys} results="Monkeys" /> } />
         <Route path="/search/:query" render={
               ({match}) => (this.state.loading) ? <h2>Loading...</h2> :
               <Gallery data={this.state.searchImages} results={match.params.query} />
               } />

         <Route component={ NotFound } />
      </Switch>

      </div>
      </Provider>

    );
  }


}
