import React, { Component } from 'react';
import axios from 'axios';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Header from './Components/Header';
import Gallery from './Components/Gallery';
import NotFound from './Components/NotFound';
import apiKey from './config';


export default class App extends Component {

  // initialize the state for the App component
  state = {
      search: [],
      cats: [],
      dogs: [],
      monkeys: [],
      loading: null
  };

  // array of default topics
  defaultImages = ['cats', 'dogs', 'monkeys'];

  // when the App component mounts we fetch data for the 3 default topics
  // and store the responses inside the state of the component with 'setState'
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

     // the following makes sure that if the user refresh the page while
     // visiting the '/search/' route the App still functions as it is supposed to
     // by fetching new data. 'handleFeatching' is called passing as argument whatever is
     // after '/search/' in the url
     const url = this.props.location.pathname;

     if(url.includes('/search')) {
       let query = url.slice(8);
       this.handleFeatching(query);
     }
  }

  // method used to fetch data from the API given a topic (query)
  // we set the state of the component with the new response every time the method is invoked.
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
      <div className="container">
      {/* I render the Header component via Route mainly because I need to access the history object
          which I will use to push a new url path inside the SearchForm component,
          otherwise I didn't need to use Route since the Header component will be always visible in the app */}
        <Route render={ ({history}) => <Header handleFeatching={this.handleFeatching} history={history} /> } />
        <Switch>
      {/* depending on which Route, we render the gallery component with different data passed to it.
          for our defaults we pass the data we already fetched and stored during componentDidMount,
          for the /search/ Route we pass whatever data is been fetched and store during the form search */}
           <Route exact path="/" render={ () => <Redirect to="/cats" /> } />
           <Route path="/cats" render={ () => <Gallery data={this.state.cats} results="Cats" /> } />
           <Route path="/dogs" render={ () => <Gallery data={this.state.dogs} results="Dogs" /> } />
           <Route path="/monkeys" render={ () => <Gallery data={this.state.monkeys} results="Monkeys" /> } />
           <Route path="/search/:query" render={ ({match}) => (this.state.loading) ?
             <h2>Loading...</h2> :
             <Gallery data={this.state.search} results={match.params.query} match={match} /> } />

           <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}
