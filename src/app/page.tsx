"use client";

import { QueryClientProvider, QueryClient } from "react-query";
import Charts from "./components/Charts";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <main>
          <h1 className="">Dashboard</h1>
          <Charts />
        </main>
      </QueryClientProvider>
    </>
  );
}
