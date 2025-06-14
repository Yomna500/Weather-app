import { WEATHER_API, UNITS } from "../utils/constants";

const API_KEY = import.meta.env.VITE_API_KEY;

async function fetchWeatherData(endpoint, params) {
  const queryParams = new URLSearchParams({
    ...params,
    appid: API_KEY,
  });

  const response = await fetch(
    `${WEATHER_API.BASE_URL}${endpoint}?${queryParams}`
  );

  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? "City not found"
        : "Failed to fetch weather data"
    );
  }

  return response.json();
}

export async function getCurrentWeather(city, unit = UNITS.METRIC) {
  return fetchWeatherData(WEATHER_API.ENDPOINTS.CURRENT, {
    q: city,
    units: unit,
  });
}

export async function getWeatherByCoords(
  latitude,
  longitude,
  unit = UNITS.METRIC
) {
  return fetchWeatherData(WEATHER_API.ENDPOINTS.CURRENT, {
    lat: latitude,
    lon: longitude,
    units: unit,
  });
}

export async function getForecast(city, unit = UNITS.METRIC) {
  const data = await fetchWeatherData(WEATHER_API.ENDPOINTS.FORECAST, {
    q: city,
    units: unit,
  });

  return data.list.filter((item) => item.dt_txt.includes("12:00:00"));
}

export async function getForecastByCoords(
  latitude,
  longitude,
  unit = UNITS.METRIC
) {
  const data = await fetchWeatherData(WEATHER_API.ENDPOINTS.FORECAST, {
    lat: latitude,
    lon: longitude,
    units: unit,
  });

  return data.list.filter((item) => item.dt_txt.includes("12:00:00"));
}

export function calculateDayProgress(sunrise, sunset) {
  const now = new Date().getTime() / 1000;
  const dayLength = sunset - sunrise;
  const currentProgress = ((now - sunrise) / dayLength) * 100;
  return Math.min(Math.max(currentProgress, 0), 100);
}
