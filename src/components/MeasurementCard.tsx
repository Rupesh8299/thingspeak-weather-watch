
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
              className={cn("h-2", progressColor || "")}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MeasurementCard;
