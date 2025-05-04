
import { useState, useEffect, useCallback } from "react";
import { ThingspeakResponse, ThingspeakFeed } from "@/types/thingspeak";

interface UseThingspeakProps {
  channelId: number;
  apiKey: string;
  refreshInterval?: number;
  results?: number;
}

interface UseThingspeakReturn {
  data: ThingspeakResponse | null;
  latestFeed: ThingspeakFeed | null;
  loading: boolean;
  error: Error | null;
  lastUpdated: Date | null;
  refreshData: () => Promise<void>;
  historicalData: ThingspeakFeed[];
}

export const useThingspeak = ({
  channelId,
  apiKey,
  refreshInterval = 15000,
  results = 10,
}: UseThingspeakProps): UseThingspeakReturn => {
  const [data, setData] = useState<ThingspeakResponse | null>(null);
  const [latestFeed, setLatestFeed] = useState<ThingspeakFeed | null>(null);
  const [historicalData, setHistoricalData] = useState<ThingspeakFeed[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=${results}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const responseData: ThingspeakResponse = await response.json();
      
      setData(responseData);
      setHistoricalData(responseData.feeds);
      
      if (responseData.feeds.length > 0) {
        setLatestFeed(responseData.feeds[responseData.feeds.length - 1]);
      }
      
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error("Error fetching ThingSpeak data:", err);
    } finally {
      setLoading(false);
    }
  }, [channelId, apiKey, results]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Set up auto-refresh interval
  useEffect(() => {
    if (refreshInterval <= 0) return;
    
    const intervalId = setInterval(fetchData, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [fetchData, refreshInterval]);

  return {
    data,
    latestFeed,
    loading,
    error,
    lastUpdated,
    refreshData: fetchData,
    historicalData,
  };
};
