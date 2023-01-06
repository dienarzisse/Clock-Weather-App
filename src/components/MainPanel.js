import RefreshIcon from '../assets/desktop/icon-refresh.svg';
import SunIcon from '../assets/desktop/icon-sun.svg';
import MoonIcon from '../assets/desktop/icon-moon.svg';
import Arrrow from '../assets/desktop/icon-arrow-down.svg';
import WeatherCard from './WeatherCard';
import "./css/MainPanel.css";

import { useState, useEffect } from "react";
import axios from "axios";


function MainPanel({ expended, setExpended, timeData, currentTime, setCurrentTime, theme }){
    const [quote, setQuote] = useState("“The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.”");
    const [author, setAuthor] = useState("Ada Lovelace");
    const [iconRotation, setIconRotation] = useState(0);
    const [city, setCity] = useState("Berlin");
    const [country, setCountry] = useState("Berlin");

    useEffect(() => {
        const fetchData = async () => {
            
            // quote
            const quoteData = await axios.get("https://api.quotable.io/random");
            setAuthor(quoteData.data.author);
            setQuote(quoteData.data.content);

            // axios.get('https://api.ipbase.com/v2/info?apikey=yC9ghNRppFNvWBVR7vDHFazYSpzmP5aY8gCSoaf7')
            // .then(response => {
            //     setCity(response.data.data.location.city.name);
            //     setCountry(response.data.data.location.country.name);                
            // })
            // .catch(error => {
            //     console.log(error)
            // })
        }

        fetchData();
    }, []);

    // set time
    
    const setTime = () => {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes(); 
        setCurrentTime(`${ hours < 9 ? `0${hours}`: hours }:${minutes < 9 ? `0${minutes}`: minutes}`);
    }

    setInterval(setTime, 1000);

    // event handlers
    const handleClickMore = () =>{
        setExpended(!expended);
    }
    const handleQuoteRefresh = async (event) => {
        const result = await axios.get("https://api.quotable.io/random");
        setAuthor(result.data.author);
        setQuote(result.data.content);
        setIconRotation( iconRotation + 360)
    }

    return (
        <div className="main-panel" style={ expended ? {"height":"auto"}:{"height":"100vh"}}>
            <div className="quote" style={ expended ? {"display":"none"}:{"display":"flex"}}>
                <figure>
                <blockquote>
                   {quote}
                </blockquote>
                <figcaption>{ author }</figcaption>
                </figure>
                <img className="refresh" style={{"transform":`rotate(${iconRotation}deg)`}} src={RefreshIcon} alt="new quote" onClick={handleQuoteRefresh} ></img>
            </div>
            <div className="bottom-section">
                <div className="wrapper-day-time">
                    <div className="day-time">
                        <img src={theme === "light" ? SunIcon:MoonIcon} alt="daytime icon"></img>
                        <span>{ theme === "light" ? "Good Morning":"Good Evening" }</span>
                    </div>
                </div>
                    <div className="time-data">
                        <div>{ currentTime }</div>
                        <span className="timezone">{ timeData.data.timezone}</span>
                    </div>
                <div className="location">
                    in { city }, { country }
                </div>
                <button className="expend" onClick={handleClickMore}>
                    <span>{ expended ? "less":"more"}</span>
                    <img src={ Arrrow } style={ expended ? {"transform":"rotate(0deg)"}:{"transform":"rotate(180deg)"}} alt="arrow"></img>
                </button>
            </div>
        </div>
    );
}

export default MainPanel;