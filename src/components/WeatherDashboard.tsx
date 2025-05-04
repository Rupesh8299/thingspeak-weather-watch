
import React from "react";
import { useThingspeak } from "@/hooks/useThingspeak";
import MeasurementCard from "./MeasurementCard";
import DataChart from "./DataChart";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Weather Monitoring Dashboard</h1>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          {lastUpdated && (
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
          <Button
            onClick={refreshData}
            disabled={loading}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
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
            <MeasurementCard
              title="Temperature"
              value={formatTemperature(latestFeed?.field1)}
              icon="temperature"
            />
            <MeasurementCard
              title="Humidity"
              value={formatHumidity(latestFeed?.field2)}
              icon="humidity"
            />
            <MeasurementCard
              title="Pressure"
              value={formatPressure(latestFeed?.field3)}
              icon="pressure"
            />
            <MeasurementCard
              title="Air Quality"
              value={formatAirQuality(latestFeed?.field4)}
              icon="air-quality"
              color={getAirQualityTextColor(latestFeed?.field4)}
            />
            <MeasurementCard
              title="Light Intensity"
              value={formatLightIntensity(latestFeed?.field5)}
              icon="light"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DataChart
              title="Temperature History"
              data={historicalData}
              dataKey="field1"
              color="#e05c41"
              yAxisLabel="Temperature (°C)"
            />
            <DataChart
              title="Air Quality History"
              data={historicalData}
              dataKey="field4"
              color="#4981ce"
              yAxisLabel="Air Quality"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherDashboard;
