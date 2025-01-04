"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, AlertTriangle, Search, RefreshCw } from 'lucide-react'

// Mock data for inventory items
const initialInventory = [
  { item_id: 1, item_name: "Solar Panel 400W", stock_quantity: 50, last_updated: "2023-08-15T10:30:00Z" },
  { item_id: 2, item_name: "Inverter 5kW", stock_quantity: 30, last_updated: "2023-08-14T14:45:00Z" },
  { item_id: 3, item_name: "Lithium Battery 10kWh", stock_quantity: 5, last_updated: "2023-08-13T09:15:00Z" },
  { item_id: 4, item_name: "Smart Meter", stock_quantity: 100, last_updated: "2023-08-12T16:20:00Z" },
  { item_id: 5, item_name: "Charge Controller 60A", stock_quantity: 25, last_updated: "2023-08-11T11:00:00Z" },
]

export default function InventoryManagement() {
  const [inventory, setInventory] = useState(initialInventory)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newItem, setNewItem] = useState({ item_name: "", stock_quantity: 0 })
  const [editingItem, setEditingItem] = useState(null)

  const filteredInventory = inventory.filter(item =>
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddItem = () => {
    const newId = Math.max(...inventory.map(item => item.item_id)) + 1
    const itemToAdd = {
      ...newItem,
      item_id: newId,
      last_updated: new Date().toISOString()
    }
    setInventory([...inventory, itemToAdd])
    setNewItem({ item_name: "", stock_quantity: 0 })
    setIsAddDialogOpen(false)
  }

  const handleUpdateItem = () => {
    if (editingItem) {
      const updatedInventory = inventory.map(item =>
        item.item_id === editingItem.item_id
          ? { ...editingItem, last_updated: new Date().toISOString() }
          : item
      )
      setInventory(updatedInventory)
      setEditingItem(null)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Inventory Management</h1>
      
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Stock Overview</CardTitle>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-8"
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Inventory Item</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new inventory item.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="item_name">Item Name</Label>
                    <Input
                      id="item_name"
                      value={newItem.item_name}
                      onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock_quantity">Stock Quantity</Label>
                    <Input
                      id="stock_quantity"
                      type="number"
                      value={newItem.stock_quantity}
                      onChange={(e) => setNewItem({ ...newItem, stock_quantity: parseInt(e.target.value) })}
                    />
                  </div>
                  <Button onClick={handleAddItem}>Add Item</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Stock Quantity</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredInventory.map((item) => (
                    <motion.tr
                      key={item.item_id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TableCell>{item.item_name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {item.stock_quantity}
                          {item.stock_quantity < 10 && (
                            <Badge variant="destructive" className="animate-pulse">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              Low Stock
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(item.last_updated).toLocaleString()}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setEditingItem(item)}>
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Inventory Item</DialogTitle>
                              <DialogDescription>
                                Update the details of the inventory item.
                              </DialogDescription>
                            </DialogHeader>
                            {editingItem && (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="edit_item_name">Item Name</Label>
                                  <Input
                                    id="edit_item_name"
                                    value={editingItem.item_name}
                                    onChange={(e) => setEditingItem({ ...editingItem, item_name: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit_stock_quantity">Stock Quantity</Label>
                                  <Input
                                    id="edit_stock_quantity"
                                    type="number"
                                    value={editingItem.stock_quantity}
                                    onChange={(e) => setEditingItem({ ...editingItem, stock_quantity: parseInt(e.target.value) })}
                                  />
                                </div>
                                <Button onClick={handleUpdateItem}>Update Item</Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader>
          <CardTitle>Inventory Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Total Items</h3>
              <p className="text-3xl font-bold text-blue-600">{inventory.length}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Total Stock</h3>
              <p className="text-3xl font-bold text-green-600">
                {inventory.reduce((sum, item) => sum + item.stock_quantity, 0)}
              </p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800">Low Stock Items</h3>
              <p className="text-3xl font-bold text-yellow-600">
                {inventory.filter(item => item.stock_quantity < 10).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {inventory
              .sort((a, b) => new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime())
              .slice(0, 5)
              .map(item => (
                <li key={item.item_id} className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4 text-blue-500" />
                  <span>{item.item_name} updated on {new Date(item.last_updated).toLocaleString()}</span>
                </li>
              ))
            }
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

