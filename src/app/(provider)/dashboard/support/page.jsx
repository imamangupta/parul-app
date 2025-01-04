"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Loader2, ChevronDown, ChevronUp, HelpCircle, Send, Paperclip } from 'lucide-react'

// FAQ data
const faqData = [
  {
    question: "How do I register as an energy provider?",
    answer: "To register as an energy provider, navigate to the 'Sign Up' page and select 'Provider' as your account type. Fill in the required information, including your company details and licensing information. Once submitted, our team will review your application and get back to you within 2-3 business days."
  },
  {
    question: "What are the fees associated with using the platform?",
    answer: "Our platform operates on a tiered fee structure based on the volume of energy traded. For small providers, we charge a 2% transaction fee. Medium-sized providers are charged 1.5%, while large-scale providers benefit from a 1% fee. There are no upfront or monthly costs - you only pay when you make a sale."
  },
  {
    question: "How is energy pricing determined on the platform?",
    answer: "Energy pricing on our platform is determined by a combination of factors, including current market rates, supply and demand dynamics, and individual provider settings. Providers can set their base rates and choose to participate in dynamic pricing models that adjust based on real-time grid conditions."
  },
  {
    question: "What types of renewable energy can be traded on the platform?",
    answer: "Our platform supports trading of various types of renewable energy, including solar, wind, hydroelectric, biomass, and geothermal. Providers can specify the source of their energy when listing it on the marketplace."
  },
  {
    question: "How are disputes between buyers and sellers handled?",
    answer: "We have a dedicated dispute resolution team that handles conflicts between buyers and sellers. If a dispute arises, both parties can file a claim through their account dashboard. Our team will review the case, gather necessary information, and work towards a fair resolution within 5-7 business days."
  }
]

// Form schema
const supportSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  attachment: z.any().optional()
})



export default function HelpSupport() {
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState(null)

  const form = useForm({
    resolver: zodResolver(supportSchema),
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
    setIsLoading(false)
    form.reset()
    setFileName(null)
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      form.setValue('attachment', file)
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Help & Support</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            <CardDescription>Find quick answers to common questions about our platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center">
                      <HelpCircle className="mr-2 h-5 w-5 text-blue-500" />
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600 mt-2">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Contact Support</CardTitle>
            <CardDescription>Can't find what you're looking for? Send us a message</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...form.register("name")} />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...form.register("email")} />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" {...form.register("subject")} />
                {form.formState.errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.subject.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" {...form.register("message")} rows={5} />
                {form.formState.errors.message && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="attachment">Attachment (optional)</Label>
                <div className="flex items-center mt-1">
                  <Input
                    id="attachment"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('attachment')?.click()}
                  >
                    <Paperclip className="mr-2 h-4 w-4" />
                    Choose File
                  </Button>
                  {fileName && (
                    <span className="ml-2 text-sm text-gray-600">{fileName}</span>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              onClick={form.handleSubmit(onSubmit)}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Ticket
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

