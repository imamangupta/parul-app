'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Users, DiamondIcon as Indian, Percent } from 'lucide-react'
import { BrowseHostingRequests } from '@/components/provider/BrowseHostingRequests'
import { ActiveHostingContracts } from '@/components/provider/ActiveHostingContracts'

// Dummy data
const hostingRequests = [
  { id: 1, consumerName: 'Aarav Patel', location: 'Mumbai', roofArea: 100, capacityNeeded: 10, revenueSplit: 70 },
  { id: 2, consumerName: 'Diya Sharma', location: 'Delhi', roofArea: 150, capacityNeeded: 15, revenueSplit: 65 },
  { id: 3, consumerName: 'Arjun Singh', location: 'Bangalore', roofArea: 200, capacityNeeded: 20, revenueSplit: 60 },
  { id: 4, consumerName: 'Ananya Reddy', location: 'Hyderabad', roofArea: 120, capacityNeeded: 12, revenueSplit: 75 },
  { id: 5, consumerName: 'Vikram Malhotra', location: 'Chennai', roofArea: 180, capacityNeeded: 18, revenueSplit: 68 },
]

const activeContracts = [
  { id: 1, consumerName: 'Ravi Kumar', capacity: 10, revenueSplit: 70, status: 'Active', progress: 60 },
  { id: 2, consumerName: 'Priya Gupta', capacity: 15, revenueSplit: 65, status: 'Negotiation', progress: 30 },
  { id: 3, consumerName: 'Amit Choudhury', capacity: 20, revenueSplit: 60, status: 'Active', progress: 80 },
  { id: 4, consumerName: 'Neha Kapoor', capacity: 12, revenueSplit: 75, status: 'Completed', progress: 100 },
  { id: 5, consumerName: 'Sanjay Desai', capacity: 18, revenueSplit: 68, status: 'Active', progress: 45 },
]

export default function SolarHostingPage() {
  const [activeTab, setActiveTab] = useState('browse')

  const totalCapacity = activeContracts.reduce((sum, contract) => sum + contract.capacity, 0)
  const averageRevenueSplit = Math.round(activeContracts.reduce((sum, contract) => sum + contract.revenueSplit, 0) / activeContracts.length)
  const activeContractsCount = activeContracts.filter(contract => contract.status === 'Active').length

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Solar Hosting Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-orange-100 to-yellow-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hosted Capacity</CardTitle>
            <Sun className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity} kW</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-100 to-cyan-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeContractsCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-100 to-emerald-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Revenue Split</CardTitle>
            <Percent className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRevenueSplit}%</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-100 to-pink-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hosting Requests</CardTitle>
            <Indian className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hostingRequests.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Hosting Requests</TabsTrigger>
          <TabsTrigger value="active">Active Hosting Contracts</TabsTrigger>
        </TabsList>
        <TabsContent value="browse">
          <BrowseHostingRequests requests={hostingRequests} />
        </TabsContent>
        <TabsContent value="active">
          <ActiveHostingContracts contracts={activeContracts} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

