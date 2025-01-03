'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Settings, Home, PanelTop, CloudRain, DollarSign, Wallet, Boxes, PenToolIcon as Tool, BarChart, User, HelpCircle, LogOut, X } from 'lucide-react'

const providerNav = [
  { name: "Dashboard Overview", icon: Home, link: "/dashboard" },
  { name: "Installations", icon: PanelTop, link: "/dashboard/installations" },
  { name: "Solar Hosting", icon: CloudRain, link: "/dashboard/hosting" },
  { name: "Energy Trading", icon: DollarSign, link: "/dashboard/trading" },
  { name: "Financials", icon: Wallet, link: "/dashboard/financials" },
  { name: "Inventory Management", icon: Boxes, link: "/dashboard/inventory" },
  { name: "Maintenance", icon: Tool, link: "/dashboard/maintenance" },
  { name: "Analytics", icon: BarChart, link: "/dashboard/analytics" },
  { name: "Profile Settings", icon: User, link: "/dashboard/profile" },
  { name: "Help & Support", icon: HelpCircle, link: "/dashboard/support" },
];

export default function ProviderSidebar({ isOpen, closeSidebar }) {
  const [status, setStatus] = useState(true)
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
    localStorage.clear()
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <motion.div 
        className={`
          fixed top-0 left-0 h-full bg-background border-r z-50
          w-[280px] md:w-[240px] lg:w-[280px]
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>SP</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">
                    Solar<span className="text-green-700">Provider</span>
                  </h2>
                  <p className="text-sm text-muted-foreground">Dashboard</p>
                </div>
              </motion.div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={closeSidebar}
                className="md:hidden"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <motion.div 
              className="p-3 flex items-center gap-3 text-sm rounded-lg bg-green-100"
              whileHover={{ scale: 1.02 }}
            >
              <User size={18} />
              <h2 className="font-medium">Solar Solutions Inc.</h2>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {providerNav.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-foreground hover:text-primary hover:bg-primary/10"
                    asChild
                  >
                    <Link href={item.link}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t space-y-4">
            <motion.div 
              className="flex items-center justify-between bg-muted rounded-lg p-2"
              whileHover={{ scale: 1.02 }}
            >
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Status:</span>
              <Switch
                checked={status}
                onCheckedChange={setStatus}
                className="data-[state=checked]:bg-primary"
              />
              <span className="text-sm font-medium">
                {status ? 'Online' : 'Offline'}
              </span>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  )
}