import PropTypes from "prop-types";

function Form({
  setCity,
  getWeatherByLocation,
  unit,
  toggleUnit,
  setSearchInput,
  searchInput,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
    }
  }
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-6">
      <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter city name"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </form>
      <div className="flex gap-2">
        <button
          onClick={getWeatherByLocation}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          My Location
        </button>
        <button
          type="button"
          onClick={toggleUnit}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          {unit === "metric" ? "°F" : "°C"}
        </button>
      </div>
    </div>
  );
}

Form.propTypes = {
  setCity: PropTypes.func.isRequired,
  getWeatherByLocation: PropTypes.func.isRequired,
  toggleUnit: PropTypes.func.isRequired,
  setSearchInput: PropTypes.func.isRequired,
  unit: PropTypes.oneOf(["metric", "imperial"]).isRequired,
  searchInput: PropTypes.string.isRequired,
};

export default Form;
