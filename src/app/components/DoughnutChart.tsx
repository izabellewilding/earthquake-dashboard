import React from "react";
import type { ChartData, ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";

type DoughnutChartProps = {
  options: ChartOptions<"doughnut">;
  data: ChartData<"doughnut">;
};

export function DoughnutChart({ data, options }: DoughnutChartProps) {
  return (
    <div className="p-4">
      <Doughnut data={data} options={options} />
    </div>
  );
}
