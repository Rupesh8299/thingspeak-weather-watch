
export interface ThingspeakFeed {
  created_at: string;
  entry_id: number;
  field1: string; // Temperature (BMP180)
  field2: string; // Humidity
  field3: string; // Pressure
  field4: string; // Air Quality
  field5: string; // Light Intensity
}

export interface ThingspeakResponse {
  channel: {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
    created_at: string;
    updated_at: string;
    last_entry_id: number;
  };
  feeds: ThingspeakFeed[];
}
