
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock cycle data
const initialData = {
  periodStart: new Date(2023, 4, 5),
  periodEnd: new Date(2023, 4, 10),
  ovulationDate: new Date(2023, 4, 19),
  symptoms: [
    { date: new Date(2023, 4, 4), type: "cramps", intensity: "mild" },
    { date: new Date(2023, 4, 5), type: "cramps", intensity: "moderate" },
    { date: new Date(2023, 4, 6), type: "headache", intensity: "severe" },
    { date: new Date(2023, 4, 7), type: "fatigue", intensity: "moderate" },
  ]
};

const CycleCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [cycleData, setCycleData] = useState(initialData);
  
  // Function to determine the class for each day
  const dayClassName = (day: Date) => {
    const isSameDay = (date1: Date, date2: Date) => {
      return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();
    };
    
    if (isSameDay(day, cycleData.periodStart)) {
      return "bg-shesoul-bubblegum text-white rounded-l-full";
    }
    
    if (isSameDay(day, cycleData.periodEnd)) {
      return "bg-shesoul-bubblegum text-white rounded-r-full";
    }
    
    if (day >= cycleData.periodStart && day <= cycleData.periodEnd) {
      return "bg-shesoul-bubblegum text-white";
    }
    
    if (isSameDay(day, cycleData.ovulationDate)) {
      return "bg-shesoul-sunflower text-foreground rounded-full border-2 border-shesoul-sunflower";
    }
    
    // Check for symptoms
    const symptomForDay = cycleData.symptoms.find(s => isSameDay(s.date, day));
    if (symptomForDay) {
      return "border-2 border-shesoul-pastel";
    }
    
    return "";
  };
  
  return (
    <Card className="bg-white bg-opacity-90 border-none shadow-lg">
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Cycle Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calendar">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border shadow-sm"
                  modifiers={{
                    periodStart: [cycleData.periodStart],
                    periodEnd: [cycleData.periodEnd],
                    periodDay: { from: cycleData.periodStart, to: cycleData.periodEnd },
                    ovulation: [cycleData.ovulationDate],
                    symptomDay: cycleData.symptoms.map(s => s.date)
                  }}
                  modifiersClassNames={{
                    periodStart: "bg-shesoul-bubblegum text-white rounded-l-full",
                    periodEnd: "bg-shesoul-bubblegum text-white rounded-r-full",
                    periodDay: "bg-shesoul-bubblegum text-white",
                    ovulation: "bg-shesoul-sunflower text-foreground rounded-full border-2 border-shesoul-sunflower",
                    symptomDay: "border-2 border-shesoul-pastel"
                  }}
                  classNames={{
                    day_selected: "bg-shesoul-pastel text-foreground hover:bg-shesoul-pastel hover:text-foreground"
                  }}
                />
              </div>
              
              <div className="flex-1">
                <div className="bg-shesoul-blush p-6 rounded-lg mb-4">
                  <h3 className="font-medium mb-2">Legend</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-shesoul-bubblegum rounded mr-2"></div>
                      <span className="text-sm">Period days</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-shesoul-sunflower rounded mr-2"></div>
                      <span className="text-sm">Ovulation</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-shesoul-pastel bg-white rounded mr-2"></div>
                      <span className="text-sm">Symptoms recorded</span>
                    </div>
                  </div>
                </div>
                
                {date && (
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-serif text-lg font-medium mb-3">
                      {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>
                    
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start border-shesoul-bubblegum text-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white">
                        + Log Period
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-shesoul-bubblegum text-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white">
                        + Log Symptoms
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-shesoul-bubblegum text-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white">
                        + Log Mood
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="symptoms">
            <div className="p-6 bg-white rounded-lg">
              <h3 className="font-serif text-xl mb-4">Symptom Tracking</h3>
              <p className="text-gray-600 mb-4">
                Track your symptoms to identify patterns and better understand your cycle.
              </p>
              <div className="space-y-4">
                <Button className="w-full bg-shesoul-pastel text-foreground hover:bg-opacity-90">Coming Soon</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="insights">
            <div className="p-6 bg-white rounded-lg">
              <h3 className="font-serif text-xl mb-4">Cycle Insights</h3>
              <p className="text-gray-600 mb-4">
                Your personalized insights will appear here once you've tracked a few cycles.
              </p>
              <div className="space-y-4">
                <Button className="w-full bg-shesoul-pastel text-foreground hover:bg-opacity-90">Coming Soon</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CycleCalendar;
