
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

export const formatTemperature = (value: string | undefined): string => {
  if (!value || isNaN(parseFloat(value))) return "N/A";
  return `${parseFloat(value).toFixed(1)}°C`;
};

export const formatHumidity = (value: string | undefined): string => {
  if (!value || isNaN(parseFloat(value))) return "N/A";
  return `${parseFloat(value).toFixed(1)}%`;
};

export const formatPressure = (value: string | undefined): string => {
  if (!value || isNaN(parseFloat(value))) return "N/A";
  return `${parseFloat(value).toFixed(2)} hPa`;
};

export const formatAirQuality = (value: string | undefined): string => {
  if (!value || isNaN(parseFloat(value))) return "N/A";
  const aqiValue = parseFloat(value);
  
  // These thresholds are arbitrary and should be adjusted based on your specific AQI scale
  if (aqiValue <= 50) return "Good";
  if (aqiValue <= 100) return "Moderate";
  if (aqiValue <= 150) return "Unhealthy for Sensitive Groups";
  if (aqiValue <= 200) return "Unhealthy";
  if (aqiValue <= 300) return "Very Unhealthy";
  return "Hazardous";
};

export const formatLightIntensity = (value: string | undefined): string => {
  if (!value || isNaN(parseFloat(value))) return "N/A";
  const lightValue = parseFloat(value);
  return `${lightValue.toFixed(0)} lux`;
};

export const getAirQualityColor = (value: string | undefined): string => {
  if (!value || isNaN(parseFloat(value))) return "bg-gray-200";
  const aqiValue = parseFloat(value);
  
  if (aqiValue <= 50) return "bg-green-500";
  if (aqiValue <= 100) return "bg-yellow-400";
  if (aqiValue <= 150) return "bg-orange-400";
  if (aqiValue <= 200) return "bg-red-500";
  if (aqiValue <= 300) return "bg-purple-600";
  return "bg-rose-900";
};

export const getAirQualityTextColor = (value: string | undefined): string => {
  if (!value || isNaN(parseFloat(value))) return "text-gray-600";
  const aqiValue = parseFloat(value);
  
  if (aqiValue <= 50) return "text-green-700";
  if (aqiValue <= 100) return "text-yellow-700";
  if (aqiValue <= 150) return "text-orange-700";
  if (aqiValue <= 200) return "text-red-700";
  if (aqiValue <= 300) return "text-purple-700";
  return "text-rose-900";
};
