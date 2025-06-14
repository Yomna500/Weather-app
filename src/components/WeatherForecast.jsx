import PropTypes from "prop-types";
import {
  formatWeekday,
  getWeatherIconUrl,
  formatTemperature,
} from "../utils/helpers";
import { UNITS } from "../utils/constants";

function WeatherForecast({ forecast, unit }) {
  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
      <div className="grid gap-4">
        {forecast.map((day) => (
          <div
            key={day.dt_txt}
            className="bg-white p-4 rounded-lg flex items-center justify-between"
          >
            <p className="font-medium">{formatWeekday(day.dt_txt)}</p>
            <img
              src={getWeatherIconUrl(day.weather[0].icon)}
              alt={day.weather[0].description}
              className="w-12 h-12"
            />
            <div className="text-right">
              <p className="font-semibold">
                {formatTemperature(day.main.temp, unit)}
              </p>
              <p className="text-sm text-gray-600 capitalize">
                {day.weather[0].description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

WeatherForecast.propTypes = {
  forecast: PropTypes.arrayOf(
    PropTypes.shape({
      dt_txt: PropTypes.string.isRequired,
      main: PropTypes.shape({
        temp: PropTypes.number.isRequired,
      }).isRequired,
      weather: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  unit: PropTypes.oneOf([UNITS.METRIC, UNITS.IMPERIAL]).isRequired,
};

export default WeatherForecast;
