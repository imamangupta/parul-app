import ProviderSidebar from '@/components/provider/ProviderSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const ProviderLayout = ({children}) => {
  return (
    <SidebarProvider>
        <ProviderSidebar />
        {children}
    </SidebarProvider>
  )
}

export default ProviderLayout