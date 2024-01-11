"use client";

import { QueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const queryClient = new QueryClient();

const QueryClientProvider = dynamic(
  () =>
    import("@tanstack/react-query").then(
      (module) => module.QueryClientProvider
    ),
  {
    ssr: false, // Ensure this is set to false
  }
);
export const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
