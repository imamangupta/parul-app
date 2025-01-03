import ConsumerSidebar from '@/components/consumer/ConsumerSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const ConsumerLayout = ({children}) => {
  return (
    <SidebarProvider>
        <ConsumerSidebar />
        {children}
    </SidebarProvider>
  )
}

export default ConsumerLayout