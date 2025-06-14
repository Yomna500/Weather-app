export const UNITS = {
  METRIC: "metric",
  IMPERIAL: "imperial",
};

export const WEATHER_API = {
  BASE_URL: "https://api.openweathermap.org/data/2.5",
  ICON_URL: "https://openweathermap.org/img/wn",
  ENDPOINTS: {
    CURRENT: "/weather",
    FORECAST: "/forecast",
  },
};

export const DATE_FORMATS = {
  WEEKDAY: { weekday: "short" },
  TIME: {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  },
};

export const UNITS_CONFIG = {
  [UNITS.METRIC]: {
    temperature: "C",
    speed: "m/s",
  },
  [UNITS.IMPERIAL]: {
    temperature: "F",
    speed: "mph",
  },
};
