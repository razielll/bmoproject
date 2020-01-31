import React, { Component } from "react";
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      restaurants: [],
      total: null,
    }
  }

  handleSumibt = (e) => {
    e.preventDefault()
    if (!this.state.searchQuery) return;
    this.fetchResults();
  };


  fetchResults = async () => {
    const API_URL = 'http://opentable.herokuapp.com/api/restaurants?city='

    const fetchResult = await fetch(API_URL + this.state.searchQuery)
    const jsonResult = await fetchResult.json();
    const { total_entries, restaurants } = jsonResult;

    this.setState({
      total: total_entries,
      restaurants: restaurants
    }, () => {
      console.log('state updated with results!');
    });
  };


  priceToDollarSigns = (numStr) => {
    let dollarStr = '';
    for (let i = 0; i < Number(numStr); i++) {
      dollarStr += '$';
    }
    return <span style={{ color: 'green' }}>{dollarStr}</span>;
  };

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value })
  };

  render() {
    const { searchQuery, restaurants, total, page } = this.state;
    const isResturants = restaurants && restaurants.length > 0;
    return (
      <>
        <div className="content-wrapper">
          <h1>Find restaurants in your town</h1>
          <form className="form-wrapper" aria-label="city input form" onSubmit={this.handleSumibt}>
            <input className="search-input" placeholder="Enter a city" aria-label="city input field" type="text" value={searchQuery} onChange={this.handleChange} />
            <button className="send-btn" aria-label="search restaurants">Find restaurants</button>
          </form>


          {isResturants ? (
            <>
              <h4> We found {total} restaurants in {searchQuery}!</h4>
              {restaurants.map((restaurant, i) => (
                <div className="rest-item" aria-label="restaurant info" key={restaurant.id}>
                  <span style={{ fontWeight: 'bold' }} aria-label="restaurant name">{restaurant.name},</span>
                  <span aria-label="restaurant address">Address: {restaurant.address},</span>
                  <span aria-label="restaurant pricing indicator - the more dollar signs the more expensive" className="price">
                    Pricing &nbsp; {this.priceToDollarSigns(restaurant.price)}
                  </span>
                </div>
              ))}

              {total > 25 && (
                <div>
                  <button onClick={() => this.handlePageChange('prev')} aria-label="next page button">Previos page</button>
                  <button onClick={() => this.handlePageChange('next')} aria-label="previous page button">Next page</button>
                </div>
              )}

            </>)
            : null
          }

        </div>
      </>
    )
  }
}
