export const fetchLocationId = async (city) => {
  const response = await fetch(
    `https://www.metaweather.com/api/location/search/?query=${city}`
  );
  const locations = await response.json();
  return locations[0].woeid;
};

export const fetchWeather = async (woeid) => {
  const response = await fetch(
    `https://www.metaweather.com/api/location/${woeid}/`
  );
  const { title, consolidated_weather, time } = await response.json();
  const { weather_state_name, the_temp } = consolidated_weather[0];
  const tempInF = the_temp * (9 / 5) + 32;
  const date = new Date(Date.parse(time));
  const formattedTime = `${Math.floor(
    date.getHours() % 12
  )}:${date.getMinutes()}${date.getHours() <= 12 ? "AM" : "PM"}`;

  return {
    location: title,
    weather: weather_state_name,
    temperature: tempInF,
    time: formattedTime,
  };
};
