import React from "react";
import Charts from "./components/Charts";
import { SideNavbar } from "./components/SideNavbar";

export default function Home() {
  return (
    <main className="bg-slate-900">
      <SideNavbar>
        <Charts />
      </SideNavbar>
    </main>
  );
}
