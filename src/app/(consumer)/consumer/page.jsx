
import React from "react";

import AnalyticsChart from "@/components/consumer/AnalyticsChart";
import DashboardCards from "@/components/consumer/DashboardCards";

const CosumerDashboard = () => {
  return (
    <main>
      <div className="space-y-6">
        {/* <h1 className="text-3xl font-bold">Dashboard</h1> */}
        {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>Card {i + 1}</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content goes here.</p>
              </CardContent>
            </Card>
          ))}
        </div> */}
        <DashboardCards/>
        <AnalyticsChart/>
      </div>
    </main>
  );
};

export default CosumerDashboard;
