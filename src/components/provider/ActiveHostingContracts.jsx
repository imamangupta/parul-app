'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function ActiveHostingContracts({ contracts }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Contract ID</TableHead>
            <TableHead>Consumer Name</TableHead>
            <TableHead>Capacity (kW)</TableHead>
            <TableHead>Revenue Split</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell className="font-medium">{contract.id}</TableCell>
              <TableCell>{contract.consumerName}</TableCell>
              <TableCell>{contract.capacity}</TableCell>
              <TableCell>{contract.revenueSplit}%</TableCell>
              <TableCell>
                <Badge
                  variant={contract.status === 'Active' ? 'default' : contract.status === 'Completed' ? 'secondary' : 'outline'}
                >
                  {contract.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  <Progress value={contract.progress} className="w-[60%] mr-2" />
                  <span className="text-sm text-gray-500">{contract.progress}%</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

