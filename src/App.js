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
      search: [],
      cats: [],
      dogs: [],
      monkeys: [],
      loading: null
  };

  defaultImages = ['cats', 'dogs', 'monkeys'];



  componentDidMount() {

    for(let i = 0; i < this.defaultImages.length; i++) {
       axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.defaultImages[i]}&per_page=24&format=json&nojsoncallback=1`)
       .then(response => {
         this.setState({
           [this.defaultImages[i]] : response.data.photos.photo
         })
       })
       .catch(error => {
         console.log('Error fetching and parsing the data', error)
       })
     }

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
          search: response.data.photos.photo,
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

        actions: {
          handleFeatching: this.handleFeatching
        }
      }}>

      <div className="container">
      <Route component={ Header } />

      <Switch>
         <Route exact path="/" render={ () => <Redirect to="/cats" /> } />

         <Route path="/cats" render={
           () => (this.state.cats.length === 0) ? <h2>Loading...</h2> :

           <Gallery data={this.state.cats} results="Cats" />
         } />


         <Route path="/dogs" render={
           () => (this.state.dogs.length === 0) ? <h2>Loading...</h2> :
           <Gallery data={this.state.dogs} results="Dogs" />
         } />



         <Route path="/monkeys" render={ () => <Gallery data={this.state.monkeys} results="Monkeys" /> } />
         <Route path="/search/:query" render={
               ({match}) => (this.state.loading) ? <h2>Loading...</h2> :
               <Gallery data={this.state.search} results={match.params.query} />
               } />

         <Route component={ NotFound } />
      </Switch>

      </div>
      </Provider>

    );
  }


}
