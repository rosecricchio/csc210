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
        // location: '',
        latitude: '',
        longitude: '',
        weather: '',
    };


    // this.onTextboxChangeLocation = this.onTextboxChangeLocation.bind(this);
    this.onTextboxChangeLatitude = this.onTextboxChangeLatitude.bind(this);
    this.onTextboxChangeLongitude = this.onTextboxChangeLongitude.bind(this);
    this.onLocationSubmit = this.onLocationSubmit.bind(this);
    
  }

//   onTextboxChangeLocation(event) {
//     this.setState({
//       location: event.target.value,
//     });
//     console.log(event.target.value);
//   }

  onTextboxChangeLatitude(event) {
      this.setState({
          latitude: event.target.value,
      });
      console.log(event.target.value);
  }

  onTextboxChangeLongitude(event) {
    this.setState({
        longitude: event.target.value,
    });
    console.log(event.target.value);
}

  onLocationSubmit() {
      const {
          latitude, 
          longitude,
          weather,
      } = this.state;
      console.log('submitted!');
      const position = {
          latitude: latitude,
          longitude: longitude,
      };
      DarkSkyApi.loadCurrent(position)
      .then(result => this.setState({
          weather: result,
      }));
  }


//   componentDidMount() {
//       console.log('mounted!');
//       DarkSkyApi.loadCurrent().then(
//         result => this.setState({
//             weather: result,
//         })
//         );
    
//   }

//   {time, summary, icon, nearestStormDistance, 
//     nearestStormBearing, precipIntensity, precipProbability, 
//     temperature, apparentTemperature, dewPoint, humidity, 
//     pressure, windSpeed, windGust, windBearing, cloudCover, 
//     uvIndex, visibility, ozone, windDirection, nearestStormDirection, 
//     dateTime, day}

  render() {
      const {
          latitude,
          longitude,
          weather,
      } = this.state;
      return (
          <div class="container">

             <TextField
              label="Enter latitude"
              value={latitude}
              onChange={this.onTextboxChangeLatitude}
              margin="normal"
            /> <br />
            <TextField
              label="Enter longitude"
              value={longitude}
              onChange={this.onTextboxChangeLongitude}
              margin="normal"
            /> <br />
            <Button 
              onClick={this.onLocationSubmit}
              variant="contained"
              color="primary">
              Submit
            </Button>
            <p>{weather.time}</p>
            <p>Summary: {weather.summary}</p>
            <p>Temperature: {weather.temperature}</p>
            <p>Apparent Temperature: {weather.apparentTemperature}</p>
            <p>Humidity: {weather.humidity}</p>
            <p>WindSpeed: {weather.windSpeed}</p>
            <p>Visibility: {weather.visibility}</p>
            {/* <p>dateTime: {weather.dateTime}</p> */}
            <p>Day: {weather.day}</p>
        </div>
      );
        
  }
}

export default WeatherScreen;