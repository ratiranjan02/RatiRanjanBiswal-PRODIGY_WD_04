const apiKey = '1354fb72c2ef2aec5fe8713eacd6eaf1'; 

document.getElementById('location-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const location = document.getElementById('location-input').value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location.');
    }
});

function fetchWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
            updateCurrentTime();
        })
        .catch(error => alert('Error fetching weather data: ' + error.message));
}

function displayWeatherData(data) {
    const locationName = document.getElementById('location-name');
    const weatherDescription = document.getElementById('weather-description');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const weatherCard = document.getElementById('weather-card');

    if (data.cod === 200) {
        locationName.textContent = `${data.name}, ${data.sys.country}`;
        weatherDescription.textContent = capitalizeFirstLetter(data.weather[0].description);
        temperature.innerHTML = `<i class="fas fa-thermometer-half"></i><b>Temperature:</b> ${data.main.temp}°C`;
        humidity.innerHTML = `<i class="fas fa-tint"></i><b>Humidity:</b> ${data.main.humidity}%`;
        windSpeed.innerHTML = `<i class="fas fa-wind"></i><b>Wind Speed:</b> ${data.wind.speed} m/s`;

        
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherDescription.innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description} icon"> ${weatherDescription.textContent}`;

        weatherCard.classList.add('weather-loaded');
    } else {
        alert(`Error: ${data.message}`);
    }
}

function updateCurrentTime() {
    const currentTimeElement = document.getElementById('current-time');
    const currentDateElement = document.getElementById('current-date');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const date = now.toLocaleDateString();

    currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
    currentDateElement.textContent = `${day}, ${date}`;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
setInterval(updateCurrentTime, 1000);
