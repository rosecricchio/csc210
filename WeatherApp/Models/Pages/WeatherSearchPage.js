import React from "react";

import Titles from "../PageComponents/WeatherSearchComponents/Title";
import Form from "../PageComponents/WeatherSearchComponents/Form";
import Weather from "../PageComponents/WeatherSearchComponents/Weather";

const API_KEY = "d7256234b929ca2f1093a9ae5652778c";

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            error: undefined
        };

        this.getWeather = this.getWeather.bind(this);
    }
    getWeather(e) {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
            .then(api_call => api_call.json())
            .then(data => {
                console.log("my name is benson");
                if (city && country) {
                    this.setState({
                        temperature: data.main.temp,
                        city: data.name,
                        country: data.sys.country,
                        humidity: data.main.humidity,
                        description: data.weather[0].description,
                        error: ""
                    });
                } else {
                    this.setState({
                        temperature: undefined,
                        city: undefined,
                        country: undefined,
                        humidity: undefined,
                        description: undefined,
                        error: "Please enter the values."
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        return (
            < div >
                <Titles />
                <Form getWeather={this.getWeather} />
                <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                />
            </div >
        );
    }
};
export default Index;