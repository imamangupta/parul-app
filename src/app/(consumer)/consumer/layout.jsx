import { ConsumerNavbar } from '@/components/consumer/ConsumerNavbar'
import ConsumerSidebar from '@/components/consumer/ConsumerSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const ConsumerLayout = ({children}) => {
  return (
    <main>
      {/* <ConsumerNavbar/>
      <SidebarProvider>
        <ConsumerSidebar />
        {children}
    </SidebarProvider> */}
    <div className="min-h-screen flex flex-col">
      <ConsumerNavbar />
      <div className="flex flex-1 pt-16">
        <SidebarProvider>
        <ConsumerSidebar/>
        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>
        </SidebarProvider>
      </div>
    </div>
    </main>
  )
}

export default ConsumerLayout