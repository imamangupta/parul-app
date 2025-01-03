import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from "@/components/ui/button"
  import { Badge } from "@/components/ui/badge"
  import { Eye, Pencil, Trash2 } from 'lucide-react'
  
  export function InstallationsTable({ installations }) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>Consumer Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Capacity (kW)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Completion Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {installations.map((installation) => (
            <TableRow key={installation.id}>
              <TableCell>{installation.projectName}</TableCell>
              <TableCell>{installation.consumerName}</TableCell>
              <TableCell>{installation.location}</TableCell>
              <TableCell>{installation.capacity}</TableCell>
              <TableCell>
                <Badge variant={installation.status === 'Pending' ? 'warning' : 'success'}>
                  {installation.status}
                </Badge>
              </TableCell>
              <TableCell>{installation.startDate}</TableCell>
              <TableCell>{installation.completionDate || 'N/A'}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  
  