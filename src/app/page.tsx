"use client";

import { QueryClientProvider, QueryClient } from "react-query";
import DataView from "./components/DataView";
import { SideNavbar } from "./components/SideNavbar";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <main>
          <h1 className="">Dashboard</h1>
          <SideNavbar>
            <DataView />
          </SideNavbar>
        </main>
      </QueryClientProvider>
    </>
  );
}
