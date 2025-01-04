"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { ArrowUpRight, ArrowDownRight, TrendingUp, IndianRupee, Zap } from 'lucide-react'

const revenueData = [
  { month: 'Jan', revenue: 45000, energySold: 11250 },
  { month: 'Feb', revenue: 52000, energySold: 13000 },
  { month: 'Mar', revenue: 49000, energySold: 12250 },
  { month: 'Apr', revenue: 58000, energySold: 14500 },
  { month: 'May', revenue: 55000, energySold: 13750 },
  { month: 'Jun', revenue: 62000, energySold: 15500 },
  { month: 'Jul', revenue: 68000, energySold: 17000 },
  { month: 'Aug', revenue: 72000, energySold: 18000 },
]

const kpis = [
  { title: "Monthly Revenue", value: 72000, change: "+5.8%", icon: IndianRupee },
  { title: "Year-to-Date Earnings", value: 4610, change: "+12.4%", icon: TrendingUp },
  { title: "Energy Sold (kWh)", value: 8000, change: "+6.2%", icon: Zap },
]

export function RevenueOverview() {
  const [chartType, setChartType] = useState<'area' | 'bar'>('area')
  const [dataType, setDataType] = useState<'revenue' | 'energySold'>('revenue')

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-none shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{kpi.value}</div>
              <p className={`text-xs ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
                {kpi.change.startsWith('+') ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {kpi.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-blue-800">Revenue Trend</CardTitle>
          <div className="flex gap-4">
            <Select value={chartType} onValueChange={(value) => setChartType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chart Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="area">Area Chart</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dataType} onValueChange={(value) => setDataType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Data Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="energySold">Energy Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
                <Area 
                  type="monotone" 
                  dataKey={dataType} 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            ) : (
              <BarChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
                <Bar dataKey={dataType} fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

