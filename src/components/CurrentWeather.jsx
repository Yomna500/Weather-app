import PropTypes from "prop-types";
import DayNightCycle from "./DayNightCycle";
import WeatherStats from "./WeatherStats";

function CurrentWeather({ currentWeather, unit, dayProgress }) {
  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{currentWeather.name}</h2>
      <div className="flex items-center justify-center mb-4">
        <img
          src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
          alt="Weather icon"
          className="w-24 h-24"
        />
      </div>
      <p className="text-4xl font-bold mb-2">
        {currentWeather.main.temp}°{unit === "metric" ? "C" : "F"}
      </p>
      <p className="text-xl capitalize mb-4">
        {currentWeather.weather[0].description}
      </p>

      <DayNightCycle
        sunrise={currentWeather.sys.sunrise}
        sunset={currentWeather.sys.sunset}
        dayProgress={dayProgress}
      />

      <WeatherStats currentWeather={currentWeather} unit={unit} />
    </div>
  );
}

CurrentWeather.propTypes = {
  currentWeather: PropTypes.shape({
    name: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
    sys: PropTypes.shape({
      sunrise: PropTypes.number.isRequired,
      sunset: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  unit: PropTypes.oneOf(["metric", "imperial"]).isRequired,
  dayProgress: PropTypes.number.isRequired,
};

export default CurrentWeather;
