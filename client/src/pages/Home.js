// App.js

import { useState, useEffect } from 'react';
import '../App.css';
import {Link} from 'react-router-dom'

function App() {
  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState([]);

  function updateData(data) {
    setWeatherInfo([data]);
  }
  
  async function handleTrade(e)
  {
   try {
	const res = await fetch('http://localhost:4000/trade',{
		method:'GET'
	})
	if(res.ok)
	{
		console.log('trade page');
	}
   } catch (error) {
	console.error(error);
   }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/predict', {
        method: 'POST',
        body: JSON.stringify({ city }),
        headers: {
          'content-type': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        updateData(data);
        console.log('success');
      }
    } catch (err) {
      console.error(err);
    }
    setCity('');
  }

  
  

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='city'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type='submit'>Submit</button>
        <div>
          {weatherInfo.map((data, index) => (
            <div key={index}>
              <p>City: {data.city}</p>
              <p>Temperature: {data.temp}</p>
              <p>Humidity: {data.humidity}</p>
              <p>Wind Speed: {data.windspeed}</p>
			  <p>Crop:{data.predictedData}</p>
            </div>
          ))}
        </div>
      </form>
	  <div>
		<Link to='/trade'>
		 <button onClick={handleTrade}>Trade</button>
		</Link>
	  </div>
	  
    </div>
  );
}

export default App;

