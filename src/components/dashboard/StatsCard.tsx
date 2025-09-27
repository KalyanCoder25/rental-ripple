import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: "up" | "down" | "neutral";
}

const StatsCard = ({ title, value, change, icon: Icon, trend }: StatsCardProps) => {
  const trendColor = {
    up: "text-success",
    down: "text-destructive", 
    neutral: "text-muted-foreground"
  }[trend];

  return (
    <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <p className={`text-sm ${trendColor} mt-1`}>{change}</p>
          </div>
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;