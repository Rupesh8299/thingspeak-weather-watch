
import React from "react";
import WeatherDashboard from "@/components/WeatherDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="bg-white dark:bg-slate-800 shadow-sm">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-center">ThingSpeak Weather Monitoring</h1>
        </div>
      </header>
      <main>
        <WeatherDashboard />
      </main>
      <footer className="mt-8 py-4 border-t border-slate-200 dark:border-slate-700">
        <div className="container mx-auto text-center text-sm text-slate-500">
          <p>Powered by ThingSpeak API • Channel ID: 2946903</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
