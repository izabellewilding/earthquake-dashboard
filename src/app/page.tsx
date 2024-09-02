import React from "react";
import Charts from "./components/Charts";
import { SideNavbar } from "./components/SideNavbar";

export default function Home() {
  return (
    <main className="bg-background">
      <SideNavbar>
        <Charts />
      </SideNavbar>
    </main>
  );
}
