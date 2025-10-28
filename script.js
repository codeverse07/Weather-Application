const apiKey = 'af717d4daaa4477c285a3f1fce64b6d0'; 

function getWeather() {
    const location = document.getElementById('location').value.trim();
    const errorMessage = document.getElementById('error-message');
    const weatherInfo = document.getElementById('weather-info');

    errorMessage.style.display = "none";
    weatherInfo.style.display = "none";

    
    if (location === "") {
        errorMessage.textContent = "Please enter a location.";
        errorMessage.style.display = "block";
        weatherInfo.style.display = "none";
        return;
    }


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
        .then(response => {
            console.log('API Response:',response);
            if (!response.ok) {
                if (response.status == 404) {
                throw new Error('City not found');
            } else {
                throw new Error('Failed to retrieve weather data');
            }
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather Data:', data);
            const city = data.name;
            const temp = `${data.main.temp}°C`;
            const description = data.weather[0].description;
            const humidity = `Humidity: ${data.main.humidity}%`;
            const wind = `Wind Speed: ${data.wind.speed} m/s`;
            
            document.getElementById('city').textContent = `Weather in ${city}`;
            document.getElementById('temp').textContent = `Temperature: ${temp}`;
            document.getElementById('description').textContent = `Condition: ${description}`;
            document.getElementById('humidity').textContent = humidity;
            document.getElementById('wind').textContent = wind;
            
            weatherInfo.style.display = "block";
        })
        .catch(error => {
            console.error('Error:',error);
            if (error.message == 'City not found') {
            errorMessage.textContent ='City not Found.Please check the name and try again.';
            } else {
                errorMessage.textContent = 'Failed to retrieve weather data. Please try again.';
            }
            console.log('Error Message:', errorMessage.textContent);
            errorMessage.style.display = "block";
            weatherInfo.style.display = "none";
        });
}
