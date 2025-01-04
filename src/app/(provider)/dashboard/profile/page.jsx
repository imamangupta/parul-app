"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
// import { toast } from "@/components/ui/use-toast"
import { Loader2 } from 'lucide-react'

// Define the schema for form validation
const profileSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  notifyEmail: z.boolean(),
  notifySMS: z.boolean(),
  notifyPush: z.boolean(),
  darkMode: z.boolean(),
})


// Mock initial data (replace with API call in production)
const initialData= {
  companyName: "EcoEnergy Solutions Pvt. Ltd.",
  licenseNumber: "EESL-2023-001",
  email: "contact@ecoenergy.in",
  phone: "+91 9876543210",
  address: "123 Green Street, Eco City, Maharashtra 400001",
  notifyEmail: true,
  notifySMS: false,
  notifyPush: true,
  darkMode: false,
}

export default function ProfileSettings() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Profile Settings</h1>
        <Card>
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
            <CardDescription>Manage your company information and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      {...form.register("companyName")}
                    />
                    {form.formState.errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.companyName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <Input
                      id="licenseNumber"
                      {...form.register("licenseNumber")}
                    />
                    {form.formState.errors.licenseNumber && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.licenseNumber.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      {...form.register("phone")}
                    />
                    {form.formState.errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      {...form.register("address")}
                    />
                    {form.formState.errors.address && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.address.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Notification Preferences</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notifyEmail"
                    {...form.register("notifyEmail")}
                  />
                  <Label htmlFor="notifyEmail">Email Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notifySMS"
                    {...form.register("notifySMS")}
                  />
                  <Label htmlFor="notifySMS">SMS Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notifyPush"
                    {...form.register("notifyPush")}
                  />
                  <Label htmlFor="notifyPush">Push Notifications</Label>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Appearance</h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="darkMode"
                    {...form.register("darkMode")}
                  />
                  <Label htmlFor="darkMode">Dark Mode</Label>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              onClick={form.handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

