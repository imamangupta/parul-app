"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ArrowUpRight, ArrowDownRight, TrendingUp, IndianRupee, Zap, Info } from 'lucide-react'

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
  { title: "Monthly Revenue", value: "₹72,000", change: "+5.8%", icon: IndianRupee },
  { title: "Year-to-Date Earnings", value: "₹461,000", change: "+12.4%", icon: TrendingUp },
  { title: "Energy Sold (kWh)", value: "18,000", change: "+6.2%", icon: Zap },
]

const payments = [
  { id: 'PAY-001', amount: 12500, date: '2023-08-01', status: 'Completed', buyer: 'Maharashtra State Electricity Board' },
  { id: 'PAY-002', amount: 8750, date: '2023-08-05', status: 'Pending', buyer: 'Tata Power' },
  { id: 'PAY-003', amount: 15000, date: '2023-08-10', status: 'Completed', buyer: 'Adani Electricity' },
  { id: 'PAY-004', amount: 10000, date: '2023-08-15', status: 'Completed', buyer: 'Reliance Energy' },
  { id: 'PAY-005', amount: 13500, date: '2023-08-20', status: 'Pending', buyer: 'BSES Rajdhani Power Limited' },
]

const initialPricingModels = [
  { id: 1, name: "Fixed Rate", description: "Set a constant price per kWh", rate: 4.5, active: true },
  { id: 2, name: "Time-of-Use", description: "Different rates for peak and off-peak hours", peakRate: 5.2, offPeakRate: 3.8, active: false },
  { id: 3, name: "Dynamic Pricing", description: "Prices that fluctuate based on demand", minRate: 3.5, maxRate: 6.0, active: false },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [chartType, setChartType] = useState('area')
  const [dataType, setDataType] = useState('revenue')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [pricingModels, setPricingModels] = useState(initialPricingModels)
  const [editingId, setEditingId] = useState(null)

  const filteredPayments = payments.filter(
    (payment) =>
      (payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       payment.date.includes(searchTerm) ||
       payment.buyer.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || payment.status.toLowerCase() === statusFilter.toLowerCase())
  )

  const handleRateChange = (id, field, value) => {
    setPricingModels(pricingModels.map(model => 
      model.id === id ? { ...model, [field]: value } : model
    ))
  }

  const handleActiveToggle = (id) => {
    setPricingModels(pricingModels.map(model => 
      model.id === id ? { ...model, active: !model.active } : model
    ))
  }

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Energy Trading Dashboard</h1>
        <Card className="w-full bg-white/80 backdrop-blur-sm border-none shadow-lg">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 bg-blue-100/50 backdrop-blur-sm rounded-lg p-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white rounded-md transition-all duration-300 ease-in-out">Revenue Overview</TabsTrigger>
                <TabsTrigger value="payments" className="data-[state=active]:bg-white rounded-md transition-all duration-300 ease-in-out">Payment History</TabsTrigger>
                <TabsTrigger value="pricing" className="data-[state=active]:bg-white rounded-md transition-all duration-300 ease-in-out">Pricing Models</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
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
              </TabsContent>

              <TabsContent value="payments" className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input
                    type="text"
                    placeholder="Search by Payment ID, Date, or Buyer"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="rounded-md border bg-white overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Payment ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.buyer}</TableCell>
                          <TableCell>
                            <Badge variant={payment.status === 'Completed' ? 'success' : 'warning'}>
                              {payment.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6">
                {pricingModels.map((model) => (
                  <Card key={model.id} className="bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {model.name}
                        <Info className="h-4 w-4 ml-2 inline-block text-gray-400" title={model.description} />
                      </CardTitle>
                      <Label className="flex items-center space-x-2">
                        <Input
                          type="checkbox"
                          checked={model.active}
                          onChange={() => handleActiveToggle(model.id)}
                          className="sr-only peer"
                        />
                        <span className="peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-300 bg-gray-200 rounded-full h-6 w-11 cursor-pointer"></span>
                      </Label>
                    </CardHeader>
                    <CardContent>
                      {editingId === model.id ? (
                        <div className="space-y-4">
                          {model.name === "Fixed Rate" && (
                            <div>
                              <Label htmlFor={`rate-${model.id}`}>Rate (₹/kWh)</Label>
                              <Input
                                id={`rate-${model.id}`}
                                type="number"
                                value={model.rate}
                                onChange={(e) => handleRateChange(model.id, 'rate', parseFloat(e.target.value))}
                                step="0.1"
                                min="0"
                              />
                            </div>
                          )}
                          {model.name === "Time-of-Use" && (
                            <>
                              <div>
                                <Label htmlFor={`peak-rate-${model.id}`}>Peak Rate (₹/kWh)</Label>
                                <Input
                                  id={`peak-rate-${model.id}`}
                                  type="number"
                                  value={model.peakRate}
                                  onChange={(e) => handleRateChange(model.id, 'peakRate', parseFloat(e.target.value))}
                                  step="0.1"
                                  min="0"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`off-peak-rate-${model.id}`}>Off-Peak Rate (₹/kWh)</Label>
                                <Input
                                  id={`off-peak-rate-${model.id}`}
                                  type="number"
                                  value={model.offPeakRate}
                                  onChange={(e) => handleRateChange(model.id, 'offPeakRate', parseFloat(e.target.value))}
                                  step="0.1"
                                  min="0"
                                />
                              </div>
                            </>
                          )}
                          {model.name === "Dynamic Pricing" && (
                            <>
                              <div>
                                <Label htmlFor={`min-rate-${model.id}`}>Minimum Rate (₹/kWh)</Label>
                                <Input
                                  id={`min-rate-${model.id}`}
                                  type="number"
                                  value={model.minRate}
                                  onChange={(e) => handleRateChange(model.id, 'minRate', parseFloat(e.target.value))}
                                  step="0.1"
                                  min="0"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`max-rate-${model.id}`}>Maximum Rate (₹/kWh)</Label>
                                <Input
                                  id={`max-rate-${model.id}`}
                                  type="number"
                                  value={model.maxRate}
                                  onChange={(e) => handleRateChange(model.id, 'maxRate', parseFloat(e.target.value))}
                                  step="0.1"
                                  min="0"
                                />
                              </div>
                            </>
                          )}
                          <div className="flex justify-end space-x-2">
                            <Button onClick={() => setEditingId(null)} size="sm" className="bg-green-500 hover:bg-green-600">
                              Save
                            </Button>
                            <Button onClick={() => setEditingId(null)} size="sm" variant="outline">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div>
                            {model.name === "Fixed Rate" && (
                              <p className="text-lg font-semibold">₹{model.rate}/kWh</p>
                            )}
                            {model.name === "Time-of-Use" && (
                              <p className="text-lg font-semibold">
                                Peak: ₹{model.peakRate}/kWh, Off-Peak: ₹{model.offPeakRate}/kWh
                              </p>
                            )}
                            {model.name === "Dynamic Pricing" && (
                              <p className="text-lg font-semibold">
                                Range: ₹{model.minRate} - ₹{model.maxRate}/kWh
                              </p>
                            )}
                          </div>
                          <Button onClick={() => setEditingId(model.id)} size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
