"use client"

import { useState, useEffect } from 'react'
import { X, Zap } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"



export default function SellEnergyModal({ onClose }) {
  const [energyAmount, setEnergyAmount] = useState(100)
  const [pricePerKWh, setPricePerKWh] = useState(4)
  const [expectedRevenue, setExpectedRevenue] = useState(0)

  useEffect(() => {
    setExpectedRevenue(energyAmount * pricePerKWh)
  }, [energyAmount, pricePerKWh])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Selling energy:', { energyAmount, pricePerKWh, expectedRevenue })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sell Energy</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="energy-amount">Energy Amount (kWh)</Label>
            <Slider
              id="energy-amount"
              value={[energyAmount]}
              onValueChange={(value) => setEnergyAmount(value[0])}
              max={1000}
              step={10}
              className="mb-2"
            />
            <Input
              type="number"
              id="energy-amount"
              value={energyAmount}
              onChange={(e) => setEnergyAmount(Number(e.target.value))}
              min={0}
              max={1000}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price-per-kwh">Price Per kWh (₹)</Label>
            <Input
              type="number"
              id="price-per-kwh"
              value={pricePerKWh}
              onChange={(e) => setPricePerKWh(Number(e.target.value))}
              step={0.1}
              min={0}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expected-revenue">Expected Revenue</Label>
            <div id="expected-revenue" className="text-3xl font-bold text-blue-600">₹{expectedRevenue.toFixed(2)}</div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Zap className="mr-2 h-4 w-4" /> Confirm Sale
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

