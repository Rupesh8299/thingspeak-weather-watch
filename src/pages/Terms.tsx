
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const Terms = () => {
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
            <CardTitle className="text-2xl">Terms of Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the ThingSpeak Weather Monitoring Dashboard, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
            </p>

            <h2 className="text-xl font-semibold">2. Data Usage</h2>
            <p>
              The weather data displayed on this dashboard is sourced from ThingSpeak IoT sensors. While we strive for accuracy, we cannot guarantee the precision of all measurements.
            </p>

            <h2 className="text-xl font-semibold">3. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the dashboard after changes constitutes acceptance of the modified terms.
            </p>

            <h2 className="text-xl font-semibold">4. Limitation of Liability</h2>
            <p>
              The dashboard is provided "as is" without warranties of any kind. In no event shall the team members or contributors be liable for any damages arising from the use of this dashboard.
            </p>

            <h2 className="text-xl font-semibold">5. Contact Information</h2>
            <p>
              For questions regarding these terms, please contact the project team members: Rupesh Singh, Abhishek Singh, or Aman Sharma.
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

export default Terms;
