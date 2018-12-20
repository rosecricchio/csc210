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

  // Function to make recommendations based on weather and preferences
    makeRecommendation(temp, rain, range, hot, cold) {
        var rec = '';
        var recItems = [];

        if (temp < 32) {
            rec = 'It\s freezing! Definitely bundle up.';
            recItems = ['boots', 'coat', 'scarf', 'gloves', 'hat'];
        }

        else if (temp < 45) {
            rec = 'It\s chilly!';
            if (cold == "not") {
                recItems = ['light coat'];
            }
            else if (cold == "somewhat") {
                recItems = ['coat', 'boots'];
            }
            else if (cold == "very") {
                recItems = ['boots', 'coat', 'scarf', 'gloves', 'hat'];
            }
        }

        else if (temp < 60) {
            rec = 'It\s a mild day.';
            if (cold == "not") {
                recItems = ['light coat'];
            }
            else if (cold == "somewhat") {
                recItems = ['coat'];
            }
            else if (cold == "very") {
                recItems = ['coat', 'boots', 'hat'];
            }
        }

        else if (temp < 75) {
            rec = 'It\s warm!'; 
            if (hot == "very") {
                recItems = ['light clothing'];
            }  
        }

        else if (temp < 85) {
            rec = 'It\s hot!'; 
            if (hot == "not") {
                recItems = ['light clothing'];
            }
            else if (hot == "somewhat") {
                recItems = ['light clothing', 'sandals'];
            }
            else if (hot == "very") {
                recItems = ['light clothing', 'sandals', 'sunhat', 'sunglasses'];
            }
        }

        else if (temp <= 100) {
            rec = 'It\s sweltering! Consider light clothing like cotton or linen.';
            if (hot == "not") {
                recItems = ['light clothing', 'sandals'];
            }
            else {
                recItems = ['light clothing', 'sandals', 'sunhat', 'sunglasses'];
            }
        }

        else {
            rec = 'It\s over 100! Hydration and sunscreen are extra important!';
            recItems = ['light clothing', 'sandals', 'sunhat', 'sunglasses'];
        }

        if (rain) {
            recItems.push('raincoat', 'rainboots', 'umbrella');
        }

        // Range is difference between high and low temps
        var rangeRec = '';
        if (range > 10) {
            rangeRec = " The temperature will vary considerably today. Consider wearing layers.";
        }
        
      return [rec, recItems, rangeRec]; 
  }

  // Function to see which recommended items are owned. 
  // Items that are recommended && owned are suggested. 
  // Items that are recommended && not owned are mentioned as well. 
  // This function could definitely be optimized but here we are.
  suggestItems(recItems) {
      var items = this.props; 
      var owned = []; 
      var notOwned = []; 
    
      recItems.forEach(function(element) {
        if (element == "boots"){
            if(items.boots) {
                owned.push("boots");
            }
            else {
                notOwned.push("boots");
            }
        }
        if (element == "coat"){
            if(items.coat) {
                owned.push("heavy coat");
            }
            else {
                notOwned.push("heavy coat");
            }
        }
        if (element == "scarf"){
            if(items.scarf) {
                owned.push("scarf");
            }
            else {
                notOwned.push("scarf");
            }
        }
        if (element == "gloves"){
            if(items.gloves) {
                owned.push("gloves");
            }
            else {
                notOwned.push("gloves");
            }
        }
        if (element == "hat"){
            if(items.hat) {
                owned.push("winter hat");
            }
            else {
                notOwned.push("winter hat");
            }
        }
        if (element == "raincoat"){
            if(items.raincoat) {
                owned.push("raincoat");
            }
            else {
                notOwned.push("raincoat");
            }
        }
        if (element == "rainboots"){
            if(items.rainboots) {
                owned.push("rainboots");
            }
            else {
                notOwned.push("rainboots");
            }
        }
        if (element == "umbrella"){
            if(items.umbrella) {
                owned.push("umbrella");
            }
            else {
                notOwned.push("umbrella");
            }
        }
        if (element == "light coat"){
            if(items.lightCoat) {
                owned.push("light coat");
            }
            else {
                notOwned.push("light coat");
            }
        }
        if (element == "light clothing"){
            if(items.lightClothing) {
                owned.push("light clothing");
            }
            else {
                notOwned.push("light clothing");
            }
        }
        if (element == "sandals"){
            if(items.sandals) {
                owned.push("sandals");
            }
            else {
                notOwned.push("sandals");
            }
        }
        if (element == "sunhat"){
            if(items.sunhat) {
                owned.push("sunhat");
            }
            else {
                notOwned.push("sunhat");
            }
        }
        if (element == "sunglasses"){
            if(items.sunglasses) {
                owned.push("sunglasses");
            }
            else {
                notOwned.push("sunglasses");
            }
        }
      });

      var ownedRec = '';
      if(owned.length > 0) {
        ownedRec += 'Suggested items for today: '
        owned.forEach(function(element) {
            ownedRec += element + ', ';
        });
      }
      ownedRec = ownedRec.substring(0, ownedRec.length-2);

      var notOwnedRec = '';
      if(notOwned.length > 0) {
        notOwnedRec += 'Things you may consider getting for this weather: '
        notOwned.forEach(function(element) {
            notOwnedRec += element + ', ';
        });
      }
      notOwnedRec = notOwnedRec.substring(0, notOwnedRec.length-2);
      
      return [ownedRec, notOwnedRec];
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

      var rain = false;
      if(forecast.daily.data[0].icon == "rain") {
          rain = true;
      }
      // Get recommended items
      var rec = this.makeRecommendation(current.apparentTemperature, rain, forecast.daily.data[0].temperatureHigh-forecast.daily.data[0].temperatureLow, this.props.hot, this.props.cold);
      // Get suggested items
      var suggestion = this.suggestItems(rec[1]);

      return (
          <div className="container">
            <div className = "center" style ={{display: 'flex', justifyContent:"center"}}>
                <svg viewBox="0 0 60 55" width="400" height="200">
                    <image href = {require("./Images/animated/snowy-6.svg")} />
                </svg>
                <br />
            </div>

            <p>{this.displayGreeting(forecast.daily.data[0].day)}</p>
            <p>It currently feels like: {current.apparentTemperature}° F</p>
            <p>{rec[0]}</p>
            <p>{rec[2]}</p>
            <p>{suggestion[0]}</p>
            <p>{suggestion[1]}</p>
            
            <p>High today: {forecast.daily.data[0].temperatureHigh}° F</p>
            <p>Low today: {forecast.daily.data[0].temperatureLow}° F</p>
            <p>What to expect this week: {forecast.daily.summary}</p>
        
            </div>
      );  
      }
}

export default WeatherScreen;
