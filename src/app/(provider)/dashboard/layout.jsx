import ProviderSidebar from "@/components/provider/ProviderSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const ProviderLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <ProviderSidebar />

        {/* Main Content */}
        <main
          className={`
        transition-all duration-200 ease-in-out
        md:ml-[240px] lg:ml-[280px] 
      `}
        >
          {/* Toggle Button for Mobile */}

          <div className="w-[80vw] p-4 md:p-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ProviderLayout;
