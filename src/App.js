import React, { Component } from "react";
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      restaurants: [],
      isLoaded: false,
      error: ''
    }
  }

  componentDidMount() {
  }

  handleSumibt = (e) => {
    e.preventDefault()
    if (!this.state.searchQuery) return;
    console.log('handl sumbit');
    this.fetchResults();
  };

  fetchResults = () => {
    const API_URL = 'http://opentable.herokuapp.com/api/restaurants?city='

    fetch(API_URL + this.state.searchQuery)
      .then(res => res.json())
      .then((result) => {
        console.log('GOT RESULT', result)
        this.setState({
          isLoaded: true,
          restaurants: result.restaurants
        });
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value })
  }

  render() {
    const { searchQuery } = this.state;
    return (
      <>
        <h1>hi</h1>
        <form onSubmit={this.handleSumibt}>
          <input type="text" value={searchQuery} onChange={this.handleChange} />
        </form>

        {this.state.restaurants && this.state.restaurants.length && this.state.restaurants.map((restaurant, i) => (
          <div key={restaurant.id}>
            {restaurant.name} {restaurant.address} {restaurant.price}
          </div>
        )
        )}
      </>
    )
  }
}