"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { Activity, DollarSign, Users, Bell } from 'lucide-react'

// Dummy data
const monthlyPerformanceData = [
  { name: 'Jan', installations: 65, revenue: 1400, efficiency: 75 },
  { name: 'Feb', installations: 59, revenue: 1200, efficiency: 80 },
  { name: 'Mar', installations: 80, revenue: 1800, efficiency: 85 },
  { name: 'Apr', installations: 81, revenue: 1600, efficiency: 78 },
  { name: 'May', installations: 56, revenue: 1700, efficiency: 82 },
  { name: 'Jun', installations: 55, revenue: 1500, efficiency: 79 },
  { name: 'Jul', installations: 40, revenue: 1200, efficiency: 76 },
]

const contractTypeData = [
  { name: 'Residential', value: 400 },
  { name: 'Commercial', value: 300 },
  { name: 'Industrial', value: 200 },
  { name: 'Government', value: 100 },
]

const performanceMetrics = [
  { subject: 'Efficiency', A: 120, B: 110, fullMark: 150 },
  { subject: 'Reliability', A: 98, B: 130, fullMark: 150 },
  { subject: 'Cost-effectiveness', A: 86, B: 130, fullMark: 150 },
  { subject: 'Customer Satisfaction', A: 99, B: 100, fullMark: 150 },
  { subject: 'Environmental Impact', A: 85, B: 90, fullMark: 150 },
  { subject: 'Innovation', A: 65, B: 85, fullMark: 150 },
]

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A']

const notifications = [
  { id: 1, message: 'New contract signed with ABC Corp' },
  { id: 2, message: 'Maintenance required for installation #1234' },
  { id: 3, message: 'Revenue target achieved for Q2' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-4 border rounded-lg shadow-lg">
        <p className="font-bold">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardOverview() {
  const [totalInstallations, setTotalInstallations] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [activeContracts, setActiveContracts] = useState(0)

  useEffect(() => {
    // Simulating data fetching and animated counting
    const installationInterval = setInterval(() => {
      setTotalInstallations(prev => (prev < 1000 ? prev + 10 : 1000))
    }, 20)

    const revenueInterval = setInterval(() => {
      setTotalRevenue(prev => (prev < 5000000 ? prev + 50000 : 5000000))
    }, 20)

    const contractInterval = setInterval(() => {
      setActiveContracts(prev => (prev < 250 ? prev + 1 : 250))
    }, 20)

    return () => {
      clearInterval(installationInterval)
      clearInterval(revenueInterval)
      clearInterval(contractInterval)
    }
  }, [])

  return (
    <div className="w-full p-8 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <KPICard
          title="Total Installations"
          value={totalInstallations}
          icon={<Activity className="h-6 w-6 text-blue-600" />}
        />
        <KPICard
          title="Total Revenue"
          value={`$${(totalRevenue / 1000000).toFixed(2)}M`}
          icon={<DollarSign className="h-6 w-6 text-green-600" />}
        />
        <KPICard
          title="Active Contracts"
          value={activeContracts}
          icon={<Users className="h-6 w-6 text-purple-600" />}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyPerformanceData}>
                <defs>
                  <linearGradient id="colorInstallations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" yAxisId="left" dataKey="installations" stroke="#8884d8" fillOpacity={1} fill="url(#colorInstallations)" />
                <Area type="monotone" yAxisId="right" dataKey="revenue" stroke="#82ca9d" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contract Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contractTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                  label
                >
                  {contractTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Efficiency Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="efficiency" stroke="#ff7300" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceMetrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Current" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Target" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {notifications.map((notification) => (
              <motion.li
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-muted rounded-lg"
              >
                {notification.message}
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function KPICard({ title, value, icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

