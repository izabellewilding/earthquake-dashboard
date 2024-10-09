import React from "react";
import Charts from "./components/Charts";
import { SideNavbar } from "./components/SideNavbar";
import { GridGraphic } from "./components/GridGraphic";

export default function Home() {
  return (
    <main className="bg-black">
      <GridGraphic />
      <Charts />
    </main>
  );
}
