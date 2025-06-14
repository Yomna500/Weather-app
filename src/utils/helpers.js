import { DATE_FORMATS, UNITS_CONFIG, WEATHER_API } from "./constants";

export function formatTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString([], DATE_FORMATS.TIME);
}

export function formatWeekday(timestamp) {
  return new Date(timestamp).toLocaleDateString("en-US", DATE_FORMATS.WEEKDAY);
}

export function getWeatherIconUrl(icon, size = "") {
  return `${WEATHER_API.ICON_URL}/${icon}${size ? `@${size}x` : ""}.png`;
}

export function formatTemperature(temp, unit) {
  return `${temp}°${UNITS_CONFIG[unit].temperature}`;
}

export function formatWindSpeed(speed, unit) {
  return `${speed} ${UNITS_CONFIG[unit].speed}`;
}
