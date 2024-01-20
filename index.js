const key = 'your_api_key';

async function getWeather() {
    const city = document.getElementById('city').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Could not get weather forecast:', error.message);
        alert('Weather forecast could not be received. Please enter a valid city name.');
    }
}

async function getCurrentLocation() {
    try {
      const position = await getLocation();
      const { latitude, longitude } = position.coords;
      const weatherData = await getWeatherByCoords(latitude, longitude);
      displayWeather(weatherData);
    } catch (error) {
      console.error("Could not get location:', error);
      alert('Location could not be obtained. Please make sure you allow.');
    }
  }
  
  function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject('Your browser does not support location retrieval.');
      }
    });
  }

  async function getWeatherByCoords(latitude, longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error('Could not get weather forecast.');
    }
  }


function displayWeather(data) {
    const location = document.getElementById('location');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');

    location.textContent = data.name;
    temperature.textContent = `Heat: ${data.main.temp}°C`;
    description.textContent = `Situation: ${data.weather[0].description.toUpperCase()}`;
}


