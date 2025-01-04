"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownRight, Zap, Leaf, Star } from 'lucide-react'

// Mock data for analytics
const efficiencyData = [
  { month: 'Jan', efficiency: 85 },
  { month: 'Feb', efficiency: 88 },
  { month: 'Mar', efficiency: 87 },
  { month: 'Apr', efficiency: 89 },
  { month: 'May', efficiency: 91 },
  { month: 'Jun', efficiency: 92 },
  { month: 'Jul', efficiency: 93 },
  { month: 'Aug', efficiency: 94 },
]

const carbonOffsetData = [
  { month: 'Jan', offset: 120 },
  { month: 'Feb', offset: 150 },
  { month: 'Mar', offset: 180 },
  { month: 'Apr', offset: 200 },
  { month: 'May', offset: 220 },
  { month: 'Jun', offset: 240 },
  { month: 'Jul', offset: 260 },
  { month: 'Aug', offset: 280 },
]

const consumerSatisfactionData = [
  { name: '5 Stars', value: 70 },
  { name: '4 Stars', value: 20 },
  { name: '3 Stars', value: 7 },
  { name: '2 Stars', value: 2 },
  { name: '1 Star', value: 1 },
]

const detailedAnalyticsData = [
  { id: 1, metric: 'Total Energy Produced', value: '1,234,567 kWh', change: '+5.8%' },
  { id: 2, metric: 'Average Daily Production', value: '40,123 kWh', change: '+3.2%' },
  { id: 3, metric: 'Peak Production Hour', value: '2 PM', change: 'No change' },
  { id: 4, metric: 'Total Carbon Offset', value: '950 tons', change: '+7.1%' },
  { id: 5, metric: 'Average Installation Efficiency', value: '92%', change: '+1.5%' },
]

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('1M')

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-800">Analytics Dashboard</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1W">Last Week</SelectItem>
            <SelectItem value="1M">Last Month</SelectItem>
            <SelectItem value="3M">Last 3 Months</SelectItem>
            <SelectItem value="1Y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <KPICard
          title="Average Efficiency"
          value="92%"
          change="+1.5%"
          icon={Zap}
          color="blue"
        />
        <KPICard
          title="Carbon Offset"
          value="950 tons"
          change="+7.1%"
          icon={Leaf}
          color="green"
        />
        <KPICard
          title="Consumer Satisfaction"
          value="4.6/5"
          change="+0.2"
          icon={Star}
          color="yellow"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Installation Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Carbon Offset Contribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={carbonOffsetData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="offset" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Consumer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="10%"
                outerRadius="80%"
                barSize={20}
                data={consumerSatisfactionData}
              >
                <RadialBar
                  minAngle={15}
                  label={{ position: 'insideStart', fill: '#fff' }}
                  background
                  clockWise
                  dataKey="value"
                />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detailedAnalyticsData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.metric}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>
                    <span className={`flex items-center ${item.change.startsWith('+') ? 'text-green-600' : item.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                      {item.change.startsWith('+') ? <ArrowUpRight className="mr-1" size={16} /> : 
                       item.change.startsWith('-') ? <ArrowDownRight className="mr-1" size={16} /> : null}
                      {item.change}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function KPICard({ title, value, change, icon: Icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`${colorClasses[color]} border-none`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className={change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
              {change.startsWith('+') ? <ArrowUpRight className="inline mr-1" size={12} /> : <ArrowDownRight className="inline mr-1" size={12} />}
              {change}
            </span>{' '}
            from last month
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

