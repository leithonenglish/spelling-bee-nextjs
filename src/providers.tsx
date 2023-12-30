'use client';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CombProvider } from '@/context/comb';

export default function Providers({ children }: { children?: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CombProvider>{children}</CombProvider>
    </QueryClientProvider>
  );
}
