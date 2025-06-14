import PropTypes from "prop-types";
import { formatTime } from "../utils/helpers";

function DayNightCycle({ sunrise, sunset, dayProgress }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-2">
        <span>🌅 {formatTime(sunrise)}</span>
        <span>🌇 {formatTime(sunset)}</span>
      </div>
      <div className="relative h-4 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-blue-900 transition-all duration-1000"
          style={{ width: `${dayProgress}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-yellow-300 rounded-full shadow-lg" />
        </div>
      </div>
    </div>
  );
}

DayNightCycle.propTypes = {
  sunrise: PropTypes.number.isRequired,
  sunset: PropTypes.number.isRequired,
  dayProgress: PropTypes.number.isRequired,
};

export default DayNightCycle;
