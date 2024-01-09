"use client";

import { QueryClientProvider, QueryClient } from "react-query";
import Charts from "./components/Charts";
import { SideNavbar } from "./components/SideNavbar";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <main>
          <h1 className="">Dashboard</h1>
          <SideNavbar>
            <Charts />
          </SideNavbar>
        </main>
      </QueryClientProvider>
    </>
  );
}
