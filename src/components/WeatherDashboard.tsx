
import React from "react";
import { useThingspeak } from "@/hooks/useThingspeak";
import MeasurementCard from "./MeasurementCard";
import DataChart from "./DataChart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  formatTemperature,
  formatHumidity,
  formatPressure,
  formatAirQuality,
  formatLightIntensity,
  getAirQualityColor,
  getAirQualityTextColor,
} from "@/utils/formatters";

const WeatherDashboard: React.FC = () => {
  const isMobile = useIsMobile();
  const {
    latestFeed,
    loading,
    error,
    lastUpdated,
    refreshData,
    historicalData,
  } = useThingspeak({
    channelId: 2946903,
    apiKey: "CD8JV5VYAVX4L9EG",
    refreshInterval: 15000,
    results: 10,
  });

  // Calculate progress values for measurement cards
  const getTemperatureProgress = (temp: string | undefined) => {
    const value = parseFloat(temp || "0");
    // Assuming normal range is 0-40°C
    return Math.min(Math.max((value / 40) * 100, 0), 100);
  };

  const getHumidityProgress = (humidity: string | undefined) => {
    const value = parseFloat(humidity || "0");
    // Humidity is already 0-100%
    return value;
  };

  const getPressureProgress = (pressure: string | undefined) => {
    const value = parseFloat(pressure || "0");
    // Typical atmospheric pressure range: 950-1050 hPa
    return Math.min(Math.max(((value - 950) / 100) * 100, 0), 100);
  };

  const getAirQualityProgress = (aq: string | undefined) => {
    const value = parseFloat(aq || "0");
    // AQI typically 0-500, but our sensor might have different range
    // Assuming 0-100 for simplicity
    return Math.min(value, 100);
  };

  const getLightProgress = (light: string | undefined) => {
    const value = parseFloat(light || "0");
    // Assuming light sensor range 0-1000
    return Math.min((value / 1000) * 100, 100);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-center md:text-left mb-2">Weather Monitoring Dashboard</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {loading ? (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                Updating...
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Live Data
              </Badge>
            )}
            {lastUpdated && (
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                Updated: {lastUpdated.toLocaleTimeString()}
              </Badge>
            )}
          </div>
        </div>
        <Button
          onClick={refreshData}
          disabled={loading}
          variant="outline"
          className="flex items-center gap-2 mt-4 md:mt-0 bg-blue-50 hover:bg-blue-100 border-blue-200"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-8" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">
            Failed to fetch weather data. Please try again later.
          </span>
        </div>
      ) : loading && !latestFeed ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {/* Rearranged cards order: Temperature, Humidity, Pressure, Air Quality, Light Intensity */}
            <MeasurementCard
              title="Temperature"
              value={formatTemperature(latestFeed?.field1)}
              icon="temperature"
              progressValue={getTemperatureProgress(latestFeed?.field1)}
              progressColor="bg-gradient-to-r from-orange-300 to-red-500"
            />
            <MeasurementCard
              title="Humidity"
              value={formatHumidity(latestFeed?.field2)}
              icon="humidity"
              progressValue={getHumidityProgress(latestFeed?.field2)}
              progressColor="bg-gradient-to-r from-cyan-400 to-blue-600"
            />
            <MeasurementCard
              title="Pressure"
              value={formatPressure(latestFeed?.field5)}
              icon="pressure"
              progressValue={getPressureProgress(latestFeed?.field5)}
              progressColor="bg-gradient-to-r from-indigo-400 to-purple-600"
            />
            <MeasurementCard
              title="Air Quality"
              value={formatAirQuality(latestFeed?.field3)}
              icon="air-quality"
              color={getAirQualityTextColor(latestFeed?.field3)}
              progressValue={getAirQualityProgress(latestFeed?.field3)}
              progressColor={getAirQualityColor(latestFeed?.field3)}
            />
            <MeasurementCard
              title="Light Intensity"
              value={formatLightIntensity(latestFeed?.field4)}
              icon="light"
              progressValue={getLightProgress(latestFeed?.field4)}
              progressColor="bg-gradient-to-r from-amber-300 to-yellow-500"
            />
          </div>

          {/* Rearranged charts to match card order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <DataChart
              title="Temperature History"
              data={historicalData}
              dataKey="field1"
              color="#e05c41"
              yAxisLabel="Temperature (°C)"
            />
            <DataChart
              title="Humidity History"
              data={historicalData}
              dataKey="field2"
              color="#3b82f6"
              yAxisLabel="Humidity (%)"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <DataChart
              title="Pressure History"
              data={historicalData}
              dataKey="field5"
              color="#8b5cf6"
              yAxisLabel="Pressure (hPa)"
            />
            <DataChart
              title="Air Quality History"
              data={historicalData}
              dataKey="field3"
              color="#10b981"
              yAxisLabel="Air Quality"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
            <DataChart
              title="Light Intensity History"
              data={historicalData}
              dataKey="field4"
              color="#f59e0b"
              yAxisLabel="Light (lux)"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherDashboard;
