"use client"

import { useState } from 'react'
import { MoveRight, Zap ,Bell} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SellEnergyModal from '@/components/provider/SellEnergyModal'
import TransactionHistory from '@/components/provider/TransactionHistory'
import EnergyStats from '@/components/provider/EnergyStats'
import TradingChart from '@/components/provider/TradingChart'

export default function Dashboard() {
  const [isSellModalOpen, setIsSellModalOpen] = useState(false)

  return (
    <div className="min-h-screen  text-gray-900 p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">EnergyChain Trading</h1>
          <p className="text-gray-500 mt-1">Welcome back, Rahul</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => setIsSellModalOpen(true)}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Zap className="mr-2 h-4 w-4" /> Sell Energy
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Trading Activity</CardTitle>
            <CardDescription>Energy sold vs bought over time</CardDescription>
          </CardHeader>
          <CardContent>
            <TradingChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Energy Stats</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <EnergyStats />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest energy trades</CardDescription>
          </div>
          <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
            View All <MoveRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <TransactionHistory />
        </CardContent>
      </Card>

      {isSellModalOpen && <SellEnergyModal onClose={() => setIsSellModalOpen(false)} />}
    </div>
  )
}
