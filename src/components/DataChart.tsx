
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThingspeakFeed } from "@/types/thingspeak";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();
  const chartData = useMemo(() => {
    return data.map((feed) => ({
      timestamp: new Date(feed.created_at).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      value: parseFloat(feed[dataKey] as string) || 0,
    }));
  }, [data, dataKey]);

  return (
    <Card className="w-full transition-all duration-200 hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={isMobile ? "h-[250px]" : "h-[300px]"}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData} 
              margin={{ 
                top: 5, 
                right: isMobile ? 10 : 20, 
                left: isMobile ? 0 : 20, 
                bottom: isMobile ? 40 : 25 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
              <XAxis 
                dataKey="timestamp" 
                angle={isMobile ? -45 : -30} 
                textAnchor="end" 
                height={60} 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                tickMargin={10}
              />
              <YAxis 
                label={!isMobile ? { 
                  value: yAxisLabel || "", 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                } : undefined} 
                tick={{ fontSize: isMobile ? 10 : 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #ddd'
                }}
                labelStyle={{ fontWeight: 'bold', color: '#333' }}
              />
              <Legend 
                verticalAlign="top" 
                height={36} 
                wrapperStyle={{ fontSize: isMobile ? 10 : 12 }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2} 
                dot={{ stroke: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 8, stroke: color, strokeWidth: 2, fill: color }}
                name={title}
                animationDuration={1000}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataChart;
