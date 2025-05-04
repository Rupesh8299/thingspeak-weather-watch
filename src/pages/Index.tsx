
import React from "react";
import WeatherDashboard from "@/components/WeatherDashboard";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="bg-white dark:bg-slate-800 shadow-sm">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-center">ThingSpeak Weather Monitoring</h1>
        </div>
      </header>
      <main className="pb-8">
        <WeatherDashboard />
      </main>
      <footer className="py-4 border-t border-slate-200 dark:border-slate-700">
        <div className="container mx-auto text-center text-sm text-slate-500">
          <p className="mb-2">Powered by ThingSpeak API • Channel ID: 2946903</p>
          <p className="mb-3">Project Team: Rupesh Singh, Abhishek Singh, Aman Sharma</p>
          <p className="mb-2">© {new Date().getFullYear()} Weather Monitoring System. All Rights Reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/terms" className="text-blue-500 hover:text-blue-700">Terms of Use</Link>
            <Link to="/copyright" className="text-blue-500 hover:text-blue-700">Copyright</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
