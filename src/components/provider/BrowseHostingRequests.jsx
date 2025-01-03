'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Map, Ruler, Zap, IndianRupee } from 'lucide-react'

export function BrowseHostingRequests({ requests }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRequests = requests.filter(request =>
    request.consumerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search by consumer name or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredRequests.map((request) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <CardTitle className="flex justify-between items-center">
                    <span className="text-lg font-bold truncate">{request.consumerName}</span>
                    <Badge variant="secondary" className="bg-white text-green-700">New Request</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <Map className="w-5 h-5 mr-2 text-blue-500" />
                      <span>{request.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Ruler className="w-5 h-5 mr-2 text-purple-500" />
                      <span>{request.roofArea} m²</span>
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                      <span>{request.capacityNeeded} kW</span>
                    </div>
                    <div className="flex items-center">
                      <IndianRupee className="w-5 h-5 mr-2 text-green-500" />
                      <span>{request.revenueSplit}% Split</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center bg-gray-50">
                  <Button variant="default" className="bg-green-500 hover:bg-green-600 text-white">
                    Accept Request
                  </Button>
                  <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                    Negotiate Terms
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

