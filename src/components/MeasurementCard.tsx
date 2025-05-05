
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Thermometer, 
  Droplet, 
  AirVent, 
  Sun, 
  CloudSun 
} from "lucide-react";

interface MeasurementCardProps {
  title: string;
  value: string;
  icon: "temperature" | "humidity" | "pressure" | "air-quality" | "light";
  className?: string;
  color?: string;
  progressValue?: number;
  progressColor?: string;
}

const MeasurementCard: React.FC<MeasurementCardProps> = ({
  title,
  value,
  icon,
  className,
  color,
  progressValue,
  progressColor,
}) => {
  const getIcon = () => {
    switch (icon) {
      case "temperature":
        return <Thermometer className="h-5 w-5" />;
      case "humidity":
        return <Droplet className="h-5 w-5" />;
      case "pressure":
        return <CloudSun className="h-5 w-5" />;
      case "air-quality":
        return <AirVent className="h-5 w-5" />;
      case "light":
        return <Sun className="h-5 w-5" />;
      default:
        return null;
    }
  };

  // Get the appropriate gradient based on the measurement type
  const getProgressGradient = () => {
    switch (icon) {
      case "temperature":
        return "bg-gradient-to-r from-orange-300 via-red-500 to-red-600";
      case "humidity":
        return "bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-600";
      case "pressure":
        return "bg-gradient-to-r from-indigo-300 via-purple-500 to-purple-700";
      case "air-quality":
        return "bg-gradient-to-r from-green-300 via-green-500 to-green-700";
      case "light":
        return "bg-gradient-to-r from-amber-300 via-yellow-500 to-yellow-600";
      default:
        return progressColor || "bg-gradient-to-r from-blue-400 to-blue-600";
    }
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-200 hover:shadow-lg", className)}>
      <CardHeader className={cn("flex flex-row items-center justify-between space-y-0 pb-2", color)}>
        <CardTitle className="text-sm font-medium">
          <div className="flex items-center gap-2">
            {getIcon()}
            {title}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {progressValue !== undefined && (
          <div className="mt-2">
            <Progress 
              value={progressValue} 
              className="bg-white dark:bg-gray-700 shadow-inner"
            >
              <div 
                className={cn("h-full w-full", getProgressGradient())}
                style={{ 
                  transform: `translateX(-${100 - progressValue}%)`,
                  transition: "transform 0.4s ease-in-out"
                }}
              />
            </Progress>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MeasurementCard;
