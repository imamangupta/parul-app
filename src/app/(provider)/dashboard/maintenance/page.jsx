"use client"

import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, AlertTriangle, CheckCircle, Search, Plus } from 'lucide-react'

// Mock data for maintenance tasks
const initialMaintenanceTasks = [
  { 
    maintenance_id: 'MT001',
    installation_id: 'MHSEB001',
    description: 'Solar panel cleaning and inspection',
    status: 'Pending',
    scheduled_date: '2023-08-20'
  },
  { 
    maintenance_id: 'MT002',
    installation_id: 'TNEB002',
    description: 'Inverter firmware update',
    status: 'In Progress',
    scheduled_date: '2023-08-18'
  },
  { 
    maintenance_id: 'MT003',
    installation_id: 'KPTCL003',
    description: 'Battery replacement',
    status: 'Completed',
    scheduled_date: '2023-08-15'
  },
  { 
    maintenance_id: 'MT004',
    installation_id: 'WBSEDCL004',
    description: 'Wiring inspection and repair',
    status: 'Pending',
    scheduled_date: '2023-08-25'
  },
  { 
    maintenance_id: 'MT005',
    installation_id: 'PSPCL005',
    description: 'Energy meter calibration',
    status: 'In Progress',
    scheduled_date: '2023-08-22'
  }
]

const statusColors = {
  'Pending': 'bg-yellow-500',
  'In Progress': 'bg-blue-500',
  'Completed': 'bg-green-500'
}

export default function MaintenanceManagement() {
  const [maintenanceTasks, setMaintenanceTasks] = useState(initialMaintenanceTasks)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [newTask, setNewTask] = useState({
    installation_id: '',
    description: '',
    status: 'Pending',
    scheduled_date: ''
  })

  const handleEventClick = (info) => {
    const task = maintenanceTasks.find(t => t.maintenance_id === info.event.id)
    setSelectedTask(task)
    setIsTaskModalOpen(true)
  }

  const handleDateClick = (info) => {
    setNewTask({...newTask, scheduled_date: info.dateStr})
    setIsTaskModalOpen(true)
  }

  const handleEventDrop = (info) => {
    const updatedTasks = maintenanceTasks.map(task => 
      task.maintenance_id === info.event.id 
        ? {...task, scheduled_date: info.event.startStr}
        : task
    )
    setMaintenanceTasks(updatedTasks)
  }

  const handleAddTask = () => {
    const newId = `MT${String(maintenanceTasks.length + 1).padStart(3, '0')}`
    setMaintenanceTasks([...maintenanceTasks, {...newTask, maintenance_id: newId}])
    setNewTask({
      installation_id: '',
      description: '',
      status: 'Pending',
      scheduled_date: ''
    })
    setIsTaskModalOpen(false)
  }

  const handleUpdateTask = () => {
    const updatedTasks = maintenanceTasks.map(task => 
      task.maintenance_id === selectedTask.maintenance_id ? selectedTask : task
    )
    setMaintenanceTasks(updatedTasks)
    setIsTaskModalOpen(false)
  }

  const filteredTasks = maintenanceTasks.filter(task => 
    (task.installation_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     task.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || task.status === statusFilter)
  )

  const calendarEvents = maintenanceTasks.map(task => ({
    id: task.maintenance_id,
    title: task.description,
    start: task.scheduled_date,
    backgroundColor: statusColors[task.status],
    borderColor: statusColors[task.status]
  }))

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Maintenance Management</h1>
      
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Scheduled Maintenance</CardTitle>
          <div className="flex space-x-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" /> Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{selectedTask ? 'Edit Maintenance Task' : 'Add New Maintenance Task'}</DialogTitle>
                  <DialogDescription>
                    {selectedTask ? 'Update the details of the maintenance task.' : 'Enter the details of the new maintenance task.'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="installation_id">Installation ID</Label>
                    <Input
                      id="installation_id"
                      value={selectedTask ? selectedTask.installation_id : newTask.installation_id}
                      onChange={(e) => selectedTask 
                        ? setSelectedTask({...selectedTask, installation_id: e.target.value})
                        : setNewTask({...newTask, installation_id: e.target.value})
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={selectedTask ? selectedTask.description : newTask.description}
                      onChange={(e) => selectedTask
                        ? setSelectedTask({...selectedTask, description: e.target.value})
                        : setNewTask({...newTask, description: e.target.value})
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={selectedTask ? selectedTask.status : newTask.status}
                      onValueChange={(value) => selectedTask
                        ? setSelectedTask({...selectedTask, status: value})
                        : setNewTask({...newTask, status: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="scheduled_date">Scheduled Date</Label>
                    <Input
                      id="scheduled_date"
                      type="date"
                      value={selectedTask ? selectedTask.scheduled_date : newTask.scheduled_date}
                      onChange={(e) => selectedTask
                        ? setSelectedTask({...selectedTask, scheduled_date: e.target.value})
                        : setNewTask({...newTask, scheduled_date: e.target.value})
                      }
                    />
                  </div>
                  <Button onClick={selectedTask ? handleUpdateTask : handleAddTask}>
                    {selectedTask ? 'Update Task' : 'Add Task'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
            editable={true}
            eventDrop={handleEventDrop}
            height="auto"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek'
            }}
          />
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Issue Tracker</CardTitle>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Maintenance ID</TableHead>
                <TableHead>Installation ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.maintenance_id}>
                  <TableCell>{task.maintenance_id}</TableCell>
                  <TableCell>{task.installation_id}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={task.status === 'Completed' ? 'success' : task.status === 'In Progress' ? 'default' : 'secondary'}
                    >
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.scheduled_date}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setSelectedTask(task)
                        setIsTaskModalOpen(true)
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader>
          <CardTitle>Maintenance Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-100 p-4 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">Pending</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {maintenanceTasks.filter(task => task.status === 'Pending').length}
                </p>
              </div>
              <Clock className="h-12 w-12 text-yellow-500" />
            </div>
            <div className="bg-blue-100 p-4 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-800">In Progress</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {maintenanceTasks.filter(task => task.status === 'In Progress').length}
                </p>
              </div>
              <AlertTriangle className="h-12 w-12 text-blue-500" />
            </div>
            <div className="bg-green-100 p-4 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-800">Completed</h3>
                <p className="text-3xl font-bold text-green-600">
                  {maintenanceTasks.filter(task => task.status === 'Completed').length}
                </p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

