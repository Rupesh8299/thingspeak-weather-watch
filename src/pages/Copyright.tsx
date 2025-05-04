
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const Copyright = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-4">
        <Link to="/">
          <Button variant="outline" className="mb-6">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Copyright Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">Copyright Notice</h2>
            <p>
              © {new Date().getFullYear()} Weather Monitoring System. All Rights Reserved.
            </p>

            <h2 className="text-xl font-semibold">Ownership</h2>
            <p>
              This ThingSpeak Weather Monitoring Dashboard was created by Rupesh Singh, Abhishek Singh, and Aman Sharma. All content, design elements, and code within this application are protected by copyright laws.
            </p>

            <h2 className="text-xl font-semibold">Permitted Use</h2>
            <p>
              You may view and use this dashboard for personal, non-commercial purposes. Any other use, including reproduction, modification, distribution, or republication without prior written consent is prohibited.
            </p>

            <h2 className="text-xl font-semibold">Third-Party Content</h2>
            <p>
              This dashboard utilizes data from ThingSpeak API (Channel ID: 2946903). The ownership of this data remains with its respective owner and is displayed here under fair use.
            </p>

            <h2 className="text-xl font-semibold">Contact</h2>
            <p>
              For copyright inquiries or permissions, please contact the project team members.
            </p>
          </CardContent>
        </Card>

        <footer className="py-4 mt-8 border-t border-slate-200 dark:border-slate-700 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Weather Monitoring System. All Rights Reserved.</p>
          <p className="mt-1">Project Team: Rupesh Singh, Abhishek Singh, Aman Sharma</p>
        </footer>
      </div>
    </div>
  );
};

export default Copyright;
