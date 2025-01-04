"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, Edit2, Check, X } from 'lucide-react'

const initialPricingModels = [
  { id: 1, name: "Fixed Rate", description: "Set a constant price per kWh", rate: 4.5, active: true },
  { id: 2, name: "Time-of-Use", description: "Different rates for peak and off-peak hours", peakRate: 5.2, offPeakRate: 3.8, active: false },
  { id: 3, name: "Dynamic Pricing", description: "Prices that fluctuate based on demand", minRate: 3.5, maxRate: 6.0, active: false },
]

export function PricingModels() {
  const [pricingModels, setPricingModels] = useState(initialPricingModels)
  const [editingId, setEditingId] = useState<number | null>(null)

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

  const startEditing = (id) => {
    setEditingId(id)
  }

  const cancelEditing = () => {
    setEditingId(null)
  }

  const saveEditing = (id) => {
    setEditingId(null)
  }

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-800">Pricing Models</CardTitle>
        <CardDescription>Manage your energy pricing strategies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {pricingModels.map((model) => (
            <Card key={model.id} className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {model.name}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 inline-block text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{model.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
                <Switch
                  checked={model.active}
                  onCheckedChange={() => handleActiveToggle(model.id)}
                />
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
                      <Button onClick={() => saveEditing(model.id)} size="sm" className="bg-green-500 hover:bg-green-600">
                        <Check className="h-4 w-4 mr-1" /> Save
                      </Button>
                      <Button onClick={cancelEditing} size="sm" variant="outline">
                        <X className="h-4 w-4 mr-1" /> Cancel
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
                    <Button onClick={() => startEditing(model.id)} size="sm" variant="outline">
                      <Edit2 className="h-4 w-4 mr-1" /> Edit
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

