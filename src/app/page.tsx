"use client";

import Charts from "./components/Charts";

import { SideNavbar } from "./components/SideNavbar";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
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
