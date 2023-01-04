import './App.css';
import MainPanel from './components/MainPanel';
import ExpendedPanel from './components/ExpendedPanel';
import { useState, useEffect } from 'react';
import axios from "axios";


function App() {
  const [expended, setExpended] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [timeData, setTimeData] = useState({"data":""});
  const [currentTime, setCurrentTime] = useState("11:37");

  useEffect(() => {
    const fetchData = async () => {
        // time 
        const timeData = await axios.get("http://worldtimeapi.org/api/ip");
        setTimeData(timeData);

        // set dark mode
        const hours = new Date(timeData.data.utc_datetime).getHours();
        if( hours > 6 && hours < 20)
          setTheme("light");
        else
          setTheme("dark");
    }
    fetchData();
    setInterval(fetchData, 60000);
}, []);

  return (
    <div className="App" id={ theme }>
      <MainPanel expended={expended} setExpended={setExpended} timeData={timeData} currentTime={currentTime} setCurrentTime={setCurrentTime} theme={ theme }/>
      <ExpendedPanel expended={expended} timeData={timeData}/>
    </div>
  );
}

export default App;
