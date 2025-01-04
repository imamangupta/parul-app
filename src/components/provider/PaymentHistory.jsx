"use client"

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const payments = [
  { id: 'PAY-001', amount: 12500, date: '2023-08-01', status: 'Completed', buyer: 'Maharashtra State Electricity Board' },
  { id: 'PAY-002', amount: 8750, date: '2023-08-05', status: 'Pending', buyer: 'Tata Power' },
  { id: 'PAY-003', amount: 15000, date: '2023-08-10', status: 'Completed', buyer: 'Adani Electricity' },
  { id: 'PAY-004', amount: 10000, date: '2023-08-15', status: 'Completed', buyer: 'Reliance Energy' },
  { id: 'PAY-005', amount: 13500, date: '2023-08-20', status: 'Pending', buyer: 'BSES Rajdhani Power Limited' },
]

export function PaymentHistory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredPayments = payments.filter(
    (payment) =>
      (payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       payment.date.includes(searchTerm) ||
       payment.buyer.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || payment.status.toLowerCase() === statusFilter)
  )

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-800">Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
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
        <div className="rounded-md border bg-white">
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
      </CardContent>
    </Card>
  )
}

