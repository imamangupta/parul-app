'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Sun, Zap, MapPin, Calendar, MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ActiveInstallations({ installations }) {
  const [expandedCard, setExpandedCard] = useState(null)

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {installations.map((installation) => (
        <motion.div
          key={installation.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <CardTitle className="flex justify-between items-center">
                <span className="text-lg font-bold truncate">{installation.projectName}</span>
                <Badge variant="secondary" className="bg-white text-blue-500">Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <Sun className="w-5 h-5 mr-2 text-yellow-500" />
                  <span>{installation.capacity} kW</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-orange-500" />
                  <span>{installation.progress}% Complete</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-red-500" />
                  <span>{installation.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-500" />
                  <span>{installation.startDate}</span>
                </div>
              </div>
              <Progress value={installation.progress} className="w-full h-2" />
              {expandedCard === installation.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <p><strong>Consumer:</strong> {installation.consumerName}</p>
                  <p><strong>Description:</strong> Solar installation project for {installation.projectName}.</p>
                </motion.div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between items-center bg-gray-50">
              <Button variant="outline" onClick={() => toggleExpand(installation.id)}>
                {expandedCard === installation.id ? 'Less Info' : 'More Info'}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Installation</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Delete Installation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

