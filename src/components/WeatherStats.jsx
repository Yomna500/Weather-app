import PropTypes from "prop-types";
import { formatTemperature, formatWindSpeed } from "../utils/helpers";
import { UNITS } from "../utils/constants";

function WeatherStats({ currentWeather, unit }) {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="bg-white p-3 rounded-lg">
        <p>Feels Like</p>
        <p className="font-semibold">
          {formatTemperature(currentWeather.main.feels_like, unit)}
        </p>
      </div>
      <div className="bg-white p-3 rounded-lg">
        <p>Humidity</p>
        <p className="font-semibold">{currentWeather.main.humidity}%</p>
      </div>
      <div className="bg-white p-3 rounded-lg">
        <p>Wind Speed</p>
        <p className="font-semibold">
          {formatWindSpeed(currentWeather.wind.speed, unit)}
        </p>
      </div>
      <div className="bg-white p-3 rounded-lg">
        <p>Pressure</p>
        <p className="font-semibold">{currentWeather.main.pressure} hPa</p>
      </div>
    </div>
  );
}

WeatherStats.propTypes = {
  currentWeather: PropTypes.shape({
    main: PropTypes.shape({
      feels_like: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  unit: PropTypes.oneOf([UNITS.METRIC, UNITS.IMPERIAL]).isRequired,
};

export default WeatherStats;
