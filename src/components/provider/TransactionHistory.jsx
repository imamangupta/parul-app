"use client"

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const transactions = [
  { id: '0x1234...5678', amount: 500, price: 4.2, buyer: 'Rahul S.', date: '2023-07-01', status: 'Completed' },
  { id: '0x2345...6789', amount: 750, price: 3.8, buyer: 'Priya P.', date: '2023-07-02', status: 'Pending' },
  { id: '0x3456...7890', amount: 1000, price: 4.0, buyer: 'Amit S.', date: '2023-07-03', status: 'Completed' },
  { id: '0x4567...8901', amount: 250, price: 4.5, buyer: 'Neha G.', date: '2023-07-04', status: 'Completed' },
  { id: '0x5678...9012', amount: 1500, price: 3.9, buyer: 'Vikram R.', date: '2023-07-05', status: 'Pending' },
]

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.buyer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by Transaction ID or Buyer"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Transaction ID</TableHead>
              <TableHead>Amount (kWh)</TableHead>
              <TableHead>Price (₹/kWh)</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-mono">{transaction.id}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>₹{transaction.price.toFixed(2)}</TableCell>
                <TableCell>{transaction.buyer}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <Badge variant={transaction.status === 'Completed' ? 'success' : 'warning'}>
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
