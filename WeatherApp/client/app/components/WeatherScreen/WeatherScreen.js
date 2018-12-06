import React, { Component } from 'react';
import 'whatwg-fetch';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../../styles/vendor/normalize.scss'
import '../../styles/home.scss'
import DarkSkyApi from 'dark-sky-api';
DarkSkyApi.apiKey = 'cbc79f06974f2a9d5ceabbcaa66869bf';
DarkSkyApi.proxy = true; 
DarkSkyApi.postProcessor = (item) => {
    item.day = item.dateTime.format('ddd');
    return item;
}

class WeatherScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: true,
        weather: '',
    };
  }


  // When component mounts, make call to api using current location
componentDidMount() {
    console.log('Component mounted!');
   
    DarkSkyApi.loadCurrent().then(
        result => this.setState({
            weather: result,
        })
    );

    this.setState({ isLoading: false });

  }

  // Function to display greeting to user
  displayGreeting(day) {
    var greeting = 'Happy ';
    switch(day) {
          case 'Mon': greeting += 'Monday!';
          break; 
          case 'Tue': greeting += 'Tuesday!';
          break; 
          case 'Wed': greeting += 'Wednesday!';
          break; 
          case 'Thu': greeting += 'Thursday!';
          break; 
          case 'Fri': greeting += 'Friday!';
          break; 
          case 'Sat': greeting += 'Saturday!';
          break; 
          case 'Sun': greeting += 'Sunday!';
          break; 
          default: break;
      }
      return greeting; 
  }

  // Function to make recommendations 
    makeRecommendation(temp) {
        var rec = '';
        if (temp < 0) {
            rec = 'It\s below 0!';
        }
        else if (temp < 32) {
            rec = 'It\'s freezing!';
        }
        else if (temp < 45) {
            rec = 'It\s cold!';
        }
        else if (temp < 55) {
            rec = 'It\s chilly!';
        }
        else if (temp < 75) {
            rec = 'It\s warm!'; 
        }
        else if (temp < 85) {
            rec = 'It\s hot!'; 
        }
        else if (temp < 100) {
            rec = 'It\s sweltering!';
        }
        
      return rec; 
  }

  render() { 
      const {
        isLoading,
        weather,
      } = this.state;

      if (isLoading) {
        return (<div><p>Loading...</p></div>);
      }

      return (
          <div className="container">

            <p>{this.displayGreeting(weather.day)}</p>
            <p>{this.makeRecommendation(weather.temperature)}</p>
    
            <p>Summary: {weather.summary}</p>
            <p>Temperature: {weather.temperature}</p>
            <p>Feels Like: {weather.apparentTemperature}</p>
            <p>Humidity: {weather.humidity}</p>
            <p>WindSpeed: {weather.windSpeed}</p>
            <p>Visibility: {weather.visibility}</p>
           
        </div>
      );
        
  }

}

export default WeatherScreen;
