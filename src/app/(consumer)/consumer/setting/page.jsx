import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Settings</h2>
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Your Name" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="notifications" />
            <Label htmlFor="notifications">Enable email notifications</Label>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Solar System Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="system-size">System Size (kW)</Label>
            <Input id="system-size" type="number" placeholder="5.5" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="panel-type">Panel Type</Label>
            <Input id="panel-type" type="text" placeholder="Monocrystalline" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="solar-hosting" />
            <Label htmlFor="solar-hosting">Participate in Solar Hosting</Label>
          </div>
        </CardContent>
      </Card>
      <Button>Save Changes</Button>
    </div>
  );
}
