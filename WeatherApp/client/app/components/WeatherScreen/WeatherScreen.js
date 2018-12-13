import React, { Component } from 'react';
import 'whatwg-fetch';
import '../../styles/vendor/normalize.scss'
import '../../styles/weatherscreen.scss'
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
        forecast: '',
        current: '',
    };
  }


// When component mounts, make call to api using current location
componentDidMount() {
    console.log('Component mounted!');
    DarkSkyApi.loadForecast().then(
        result => console.log(result));

    DarkSkyApi.loadForecast().then(
        result => this.setState({
            forecast: result,
        })
    ); 

    DarkSkyApi.loadCurrent().then(
        result => console.log(result));

    DarkSkyApi.loadCurrent().then(
        result => this.setState({
            current: result,
        })
    ); 
    
    setTimeout(
        function() {
            this.setState({isLoading: false});
        }
        .bind(this), 900
    );

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
        forecast,
        current,
      } = this.state;

      if (isLoading) {
        return (
        <div className="container">
            <p>Loading...</p>
        </div>
        );
      }

      return (
          <div className="container">
            
            <br />
            <p>Weather Info</p>

            <p>{this.displayGreeting(forecast.daily.data[0].day)}</p>
            <p>{this.makeRecommendation(current.apparentTemperature)}</p>
    
            <p>Weekly Summary: {forecast.daily.summary}</p>
            <p>High today: {forecast.daily.data[0].temperatureHigh}</p>
            <p>Low today: {forecast.daily.data[0].temperatureLow}</p>
           
            
        </div>
      );
        
  }

}

export default WeatherScreen;
