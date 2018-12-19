import React, { Component } from 'react';
import 'whatwg-fetch';
import '../../styles/vendor/normalize.scss'
import '../../styles/weatherscreen.scss'
import DarkSkyApi from 'dark-sky-api';
import regeneratorRuntime from "regenerator-runtime";//leave this even though it says it's unused!
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
async componentDidMount() {
    await DarkSkyApi.loadForecast().then(
        result => console.log(result));

    await DarkSkyApi.loadForecast().then(
        result => this.setState({
            forecast: result,
        })
    ); 
    await DarkSkyApi.loadCurrent().then(
        result => console.log(result));

    await DarkSkyApi.loadCurrent().then(
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

  test() {
      var s = 'hot: ' + this.props.hot; 
      s += ', cold: ' + this.props.cold;
      s += ', coat: ' + this.props.coat + ', boots: ' + this.props.boots + ', hat: ' + this.props.hat + ', gloves: ' + this.props.gloves;
      s += ', scarf: ' + this.props.scarf + ', sunglasses: ' + this.props.sunglasses + ', raincoat: ' + this.props.raincoat + ', rainboots: ' + this.props.rainboots;
      s += ', umbrella: ' + this.props.umbrella;

    return s; 
          
    }

  // Function to make recommendations 
    makeRecommendation(temp, rain) {
        var rec = '';
        var recItems = [];
        var suggestedItems = [];
        if (temp < 0) {
            rec = 'It\s below 0! Definitely bundle up.';
            recItems = ['boots', 'coat', 'scarf', 'gloves', 'hat'];
        }
        else if (temp < 32) {
            rec = 'It\'s freezing!';
        }
        else if (temp < 45) {
            rec = 'It\s cold!';
            recItems = []
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

        if (rain) {
            recItems.push('raincoat', 'rainboots', 'umbrella');
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
            {/* I might want to change this */}
        </div>
        );
      }



      return (
          <div className="container">
          
          {/* <p>{this.test()}</p> */}

          <div className = "center" style ={{display: 'flex', justifyContent:"center"}}>
           {/* // <img src={require('./Images/animated/snowy-6.svg')} /> */}
            <svg viewBox="0 0 60 55" width="400" height="200">
                <image href = {require("./Images/animated/snowy-6.svg")} />
            </svg>
            
            
            <br />

            {/* <p>{this.test()}</p> */}
            </div>

            <p>{this.displayGreeting(forecast.daily.data[0].day)}</p>
            <p>{this.makeRecommendation(current.apparentTemperature)}</p>
    
            <p>High today: {forecast.daily.data[0].temperatureHigh}</p>
            <p>Low today: {forecast.daily.data[0].temperatureLow}</p>
            <p>Feels like: {forecast.daily.data[0].apparentTemperatureHigh}</p>
            <p>What to expect this week: {forecast.daily.summary}</p>
            </div>
            
       
      );
        
  }

}

export default WeatherScreen;
