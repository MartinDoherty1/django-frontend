'use client'

import { QueryClient, QueryClientProvider } from "react-query";


export const  queryClient = new QueryClient();

export const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
   
    
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }