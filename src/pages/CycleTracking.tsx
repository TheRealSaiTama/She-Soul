
import React from "react";
import Layout from "@/components/Layout";
import CycleCalendar from "@/components/CycleCalendar";
import StatsOverview from "@/components/StatsOverview";

const CycleTracking = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl font-bold mb-6">
          Cycle <span className="text-shesoul-bubblegum">Tracking</span>
        </h1>
        
        <div className="mb-8">
          <StatsOverview />
        </div>
        
        <div className="mb-8">
          <CycleCalendar />
        </div>
      </div>
    </Layout>
  );
};

export default CycleTracking;
