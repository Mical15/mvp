import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
const axios = require('axios');
const config = require('../../../config.js');

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      state: ''
    }
    this.post = this.post.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  post(e) {
    e.preventDefault();
    var city = this.state.city;
    var state = this.state.state;
    axios({
      method: 'get',
      url: 'https://api.ipgeolocation.io/astronomy?apiKey=' + `${config.API}` + '&location=' + city + ',%20' + state + ',%20US'
    })
      .then((response) => {
        console.log(response.data)
        ReactDOM.render(
          <div>
            <h1>Moonrise/Set Calculator!</h1>
            <Search />
            <div>
            <h2>MOONRISE: {response.data.moonrise}</h2>
            <h2>MOONSET: {response.data.moonset}</h2>
            </div>
          </div>,
          document.getElementById('app')
        )
      })
      .then(() => {
       return axios({
          method: 'POST',
          url: '/',
          data:
              {
                'city': this.state.city,
                'state': this.state.state
              }
        })
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    return (
      <div>
        <form>
          <label>Enter you City:</label>
          <input name='city' onChange={this.handleChange} />
          <label>Enter you State:</label>
          <input name='state' onChange={this.handleChange} />
          <button onClick={this.post}>Engage!</button>
        </form>
      </div>
    )
  }
}

export default Search