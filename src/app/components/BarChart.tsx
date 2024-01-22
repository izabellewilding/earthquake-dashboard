import React from "react";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

type BarChartProps = {
  options: ChartOptions<"bar">;
  data: ChartData<"bar">;
};

export function BarChart({ data, options }: BarChartProps) {
  return <Bar data={data} options={options} />;
}

export default BarChart;
