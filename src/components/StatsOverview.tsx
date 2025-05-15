
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Heart, Activity, Clock } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, color }) => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm text-gray-500 font-medium">{title}</CardTitle>
          <div className={`${color} rounded-full p-2`}>{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

const StatsOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Next Period"
        value="In 12 Days"
        description="Expected on June 28"
        icon={<Calendar className="h-4 w-4 text-white" />}
        color="bg-shesoul-bubblegum"
      />
      <StatCard
        title="Cycle Length"
        value="28 Days"
        description="Avg. over last 6 cycles"
        icon={<Clock className="h-4 w-4 text-white" />}
        color="bg-shesoul-sunflower"
      />
      <StatCard
        title="Wellbeing Score"
        value="85%"
        description="Based on your tracking data"
        icon={<Heart className="h-4 w-4 text-white" />}
        color="bg-shesoul-pastel"
      />
      <StatCard
        title="Active Tracking"
        value="42 Days"
        description="Keep up the good work!"
        icon={<Activity className="h-4 w-4 text-white" />}
        color="bg-shesoul-peach"
      />
    </div>
  );
};

export default StatsOverview;
