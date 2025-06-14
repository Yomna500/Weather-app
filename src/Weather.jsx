import { useEffect, useState } from "react";
import Form from "./components/Form";
import Loader from "./ui/Loader";
import Error from "./ui/Error";
import CurrentWeather from "./components/CurrentWeather";
import WeatherForecast from "./components/WeatherForecast";
import { UNITS } from "./utils/constants";
import {
  getCurrentWeather,
  getWeatherByCoords,
  getForecast,
  getForecastByCoords,
  calculateDayProgress,
} from "./services/weatherService";

function Weather() {
  const [searchInput, setSearchInput] = useState("");
  const [city, setCity] = useState("New York");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState(UNITS.METRIC);
  const [dayProgress, setDayProgress] = useState(0);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);

        const [weatherData, forecastData] = await Promise.all([
          getCurrentWeather(city, unit),
          getForecast(city, unit),
        ]);

        setCurrentWeather(weatherData);
        setForecast(forecastData);
        setDayProgress(
          calculateDayProgress(weatherData.sys.sunrise, weatherData.sys.sunset)
        );
      } catch (error) {
        setError(error.message);
        setCurrentWeather(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city, unit]);

  async function getWeatherByLocation() {
    try {
      setLocationError(null);
      setLoading(true);

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;

      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCoords(latitude, longitude, unit),
        getForecastByCoords(latitude, longitude, unit),
      ]);

      setCurrentWeather(weatherData);
      setCity(weatherData.name);
      setForecast(forecastData);
      setDayProgress(
        calculateDayProgress(weatherData.sys.sunrise, weatherData.sys.sunset)
      );
    } catch (error) {
      if (error.code === error.PERMISSION_DENIED) {
        setLocationError("Please enable location access to use this feature");
      } else {
        setLocationError("Failed to get your location");
      }
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function toggleUnit() {
    setUnit(unit === UNITS.METRIC ? UNITS.IMPERIAL : UNITS.METRIC);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center my-8 text-blue-800">
          🌤️ Weather App
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <Form
            setCity={setCity}
            getWeatherByLocation={getWeatherByLocation}
            unit={unit}
            toggleUnit={toggleUnit}
            setSearchInput={setSearchInput}
            searchInput={searchInput}
          />
          {locationError && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              {locationError}
            </div>
          )}

          {error && <Error error={error} />}

          {loading && <Loader />}

          {currentWeather && !loading && (
            <div className="grid md:grid-cols-2 gap-8">
              <CurrentWeather
                currentWeather={currentWeather}
                unit={unit}
                dayProgress={dayProgress}
              />

              {forecast.length > 0 && (
                <WeatherForecast forecast={forecast} unit={unit} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
