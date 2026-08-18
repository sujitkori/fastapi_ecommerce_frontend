import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

interface queryProviderProps {
    children: ReactNode; // ReactNode means "Anything React can render."
}

const queryClient = new QueryClient();

const QueryProvider = ({ children }: queryProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />  {/* This adds a small floating TanStack Query icon (usually in the bottom-left corner during development) */}
        </QueryClientProvider>
    )
}

export default QueryProvider;