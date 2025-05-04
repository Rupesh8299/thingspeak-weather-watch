
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThingspeakFeed } from "@/types/thingspeak";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";

interface DataChartProps {
  title: string;
  data: ThingspeakFeed[];
  dataKey: keyof ThingspeakFeed;
  color?: string;
  yAxisLabel?: string;
}

const DataChart: React.FC<DataChartProps> = ({ 
  title, 
  data, 
  dataKey, 
  color = "#8884d8",
  yAxisLabel 
}) => {
  const chartData = useMemo(() => {
    return data.map((feed) => ({
      timestamp: new Date(feed.created_at).toLocaleTimeString(),
      value: parseFloat(feed[dataKey] as string) || 0,
    }));
  }, [data, dataKey]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp" 
                angle={-45} 
                textAnchor="end" 
                height={60} 
              />
              <YAxis label={{ 
                value: yAxisLabel || "", 
                angle: -90, 
                position: 'insideLeft' 
              }} />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2} 
                activeDot={{ r: 8 }} 
                name={title} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataChart;
