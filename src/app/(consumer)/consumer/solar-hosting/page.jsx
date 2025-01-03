import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SolarHostingPage() {
  const hostingData = [
    { id: 1, date: "2023-07-01", energyShared: 10.5, earnings: 5.25 },
    { id: 2, date: "2023-07-02", energyShared: 12.3, earnings: 6.15 },
    { id: 3, date: "2023-07-03", energyShared: 9.8, earnings: 4.9 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Solar Hosting</h2>
      <Card>
        <CardHeader>
          <CardTitle>Hosting Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Energy Shared
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32.6 kWh</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$16.30</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Consumers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
              </CardContent>
            </Card>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Energy Shared (kWh)</TableHead>
                <TableHead>Earnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hostingData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.date}</TableCell>
                  <TableCell>{data.energyShared.toFixed(2)} kWh</TableCell>
                  <TableCell>${data.earnings.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
