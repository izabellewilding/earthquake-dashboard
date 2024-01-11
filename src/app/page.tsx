import React from "react";
import Charts from "./components/Charts";
import { SideNavbar } from "./components/SideNavbar";

export default function Home() {
  return (
    <main>
      <h1 className="">Dashboard</h1>
      <SideNavbar>
        <Charts />
      </SideNavbar>
    </main>
  );
}
