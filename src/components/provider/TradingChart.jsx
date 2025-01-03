"use client"

import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const data = [
  { name: 'Jan', sold: 4000, bought: 2400 },
  { name: 'Feb', sold: 3000, bought: 1398 },
  { name: 'Mar', sold: 2000, bought: 9800 },
  { name: 'Apr', sold: 2780, bought: 3908 },
  { name: 'May', sold: 1890, bought: 4800 },
  { name: 'Jun', sold: 2390, bought: 3800 },
  { name: 'Jul', sold: 3490, bought: 4300 },
]

export default function TradingChart() {
  const [activeData, setActiveData] = useState('sold')

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-center space-x-4 mb-4">
          <Button
            variant={activeData === 'sold' ? 'default' : 'outline'}
            onClick={() => setActiveData('sold')}
            className="text-sm"
          >
            Energy Sold
          </Button>
          <Button
            variant={activeData === 'bought' ? 'default' : 'outline'}
            onClick={() => setActiveData('bought')}
            className="text-sm"
          >
            Energy Bought
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorBought" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }} />
            <Area 
              type="monotone" 
              dataKey={activeData} 
              stroke={activeData === 'sold' ? "#3B82F6" : "#10B981"} 
              fillOpacity={1} 
              fill={`url(#color${activeData.charAt(0).toUpperCase() + activeData.slice(1)})`} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

