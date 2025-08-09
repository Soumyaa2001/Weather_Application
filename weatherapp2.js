const apikey = "972a871cc9df487e3503ecc7d7f7741d";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric";
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
    const url = apiurl.replace("{city name}", city).replace("{API key}", apikey);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
}

async function displayWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
    alert("Please enter a city name");
    return;
}


    try {
        const data = await getWeather(city);

        document.getElementById("cityName").textContent = data.name;
        document.getElementById("temperature").textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
        document.getElementById("description").textContent = `Description: ${data.weather[0].description}`;
        document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
        document.querySelector(".wind").textContent = `${data.wind.speed} m/s`;

        const mainWeather = data.weather[0].main;
        switch (mainWeather) {
            case "Clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "Snow":
                weatherIcon.src = "images/snow.png";
                break;
            case "Thunderstorm":
                weatherIcon.src = "images/thunderstorm.png";
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                break;
            case "Haze":
                weatherIcon.src = "images/haze.png";
                break;
            case "Fog":
                weatherIcon.src = "images/fog.png";
                break;
            default:
                weatherIcon.src = "images/clear.png";
        }

        document.querySelector(".weather").style.display = "flex";

    } catch (error) {
        alert("Error: " + error.message);
        document.querySelector(".weather").style.display = "none";
    }
}

document.getElementById("searchButton").addEventListener("click", displayWeather);
