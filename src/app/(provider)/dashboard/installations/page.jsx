'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InstallationsTable } from '@/components/provider/InstallationsTable'
import { ActiveInstallations } from '@/components/provider/ActiveInstallations'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Zap, MapPin, Users } from 'lucide-react'

// Dummy data (you would fetch this from an API in a real application)
const installations = [
  { id: 1, projectName: 'Sunshine Apartments', consumerName: 'Raj Patel', location: 'Mumbai', capacity: 50, status: 'Active', startDate: '2023-01-15', completionDate: null, progress: 75 },
  { id: 2, projectName: 'Green Valley School', consumerName: 'Priya Singh', location: 'Delhi', capacity: 100, status: 'Active', startDate: '2023-02-01', completionDate: null, progress: 60 },
  { id: 3, projectName: 'Tech Park Solar', consumerName: 'Amit Kumar', location: 'Bangalore', capacity: 200, status: 'Pending', startDate: '2023-03-10', completionDate: null },
  { id: 4, projectName: 'Eco Homes', consumerName: 'Sneha Reddy', location: 'Hyderabad', capacity: 75, status: 'Completed', startDate: '2022-11-20', completionDate: '2023-02-28' },
  { id: 5, projectName: 'Rural Electrification', consumerName: 'Vikram Singh', location: 'Rajasthan', capacity: 150, status: 'Active', startDate: '2023-04-05', completionDate: null, progress: 40 },
]

export default function InstallationsPage() {
  const [activeTab, setActiveTab] = useState('active')
  const [filteredInstallations, setFilteredInstallations] = useState(installations)

  const handleFilterChange = (filters) => {
    // Apply filters to installations
    // This is a simplified example; you'd typically do this on the server
    const filtered = installations.filter(installation => 
      (!filters.status || installation.status === filters.status) &&
      (!filters.location || installation.location === filters.location) &&
      (!filters.startDate || new Date(installation.startDate) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(installation.startDate) <= new Date(filters.endDate))
    )
    setFilteredInstallations(filtered)
  }

  const totalCapacity = installations.reduce((sum, installation) => sum + installation.capacity, 0)
  const activeInstallations = installations.filter(i => i.status === 'Active').length
  const totalConsumers = new Set(installations.map(i => i.consumerName)).size

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Installations Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Sun className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity} kW</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Installations</CardTitle>
            <Zap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeInstallations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consumers</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConsumers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations Covered</CardTitle>
            <MapPin className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(installations.map(i => i.location)).size}</div>
          </CardContent>
        </Card>
      </div>

      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <ActiveInstallations installations={filteredInstallations.filter(i => i.status === 'Active')} />
        </TabsContent>
        <TabsContent value="pending">
          <InstallationsTable installations={filteredInstallations.filter(i => i.status === 'Pending')} />
        </TabsContent>
        <TabsContent value="completed">
          <InstallationsTable installations={filteredInstallations.filter(i => i.status === 'Completed')} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

