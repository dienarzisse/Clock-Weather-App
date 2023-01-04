import "./css/WeatherCard.css";

function WeatherCard({ time, weatherIcon, temperature }){
    return (
        <div className="weather-card">
        <div className="hour">{ time }</div>
        <div className="weather">
            <img src={ `http://openweathermap.org/img/w/${weatherIcon}.png` } alt="weather icon"></img>
        </div>
        <div className="temperature">{ temperature }°</div>
    </div>
    );
}

export default WeatherCard;