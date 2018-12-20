import React from 'react';
//doesn't contain state property. No need of class

const Weather = props => (
    <div>
        {props.city && props.country && <p>Location: {props.city},{props.country}</p>}
        {props.temperature && <p>Temperature: {props.temperature}</p>}
        {props.humidity && <p>Humidity: {props.humidity}</p>}
        {props.description && <p>Conditions: {props.description}</p>}
        {props.error && <p>{props.error}</p>}
    </div>
);
export default Weather;