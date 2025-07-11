import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ChartConfig, 
  ChartContainer, 
  ChartLegend, 
  ChartLegendContent, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import React from "react";
import { 
  CartesianGrid, Line, 
  LineChart, Pie, 
  PieChart, XAxis 
} from "recharts";

const EventDashboardChart = () => {
  // TEMP DATA
  const lineChartData = [
    { month: "Januari", registrants: 186 },
    { month: "Februari", registrants: 305 },
    { month: "Maret", registrants: 237 },
    { month: "April", registrants: 73 },
    { month: "Mei", registrants: 209 },
    { month: "Juni", registrants: 214 },
  ]

  const pieChartData = [
    { category: "SD Perorangan", participants: 275, fill: "hsl(var(--chart-1))" },
    { category: "SMP Perorangan", participants: 200, fill: "hsl(var(--chart-2))" },
    { category: "SMP Beregu", participants: 187, fill: "hsl(var(--chart-3))" },
    { category: "SMA Perorangan", participants: 173, fill: "hsl(var(--chart-4))" },
    { category: "SMA Beregu", participants: 90, fill: "hsl(var(--chart-5))" },
  ]

  const lineChartConfig = {
    registrants: {
      label: "Pendaftar",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  const pieChartConfig = {
    "SD Perorangan": {
      label: "SD Perorangan",
      color: "hsl(var(--chart-1))",
    },
    "SMP Perorangan": {
      label: "SMP Perorangan",
      color: "hsl(var(--chart-2))",
    },
    "SMP Beregu": {
      label: "SMP Beregu",
      color: "hsl(var(--chart-3))",
    },
    "SMA Perorangan": {
      label: "SMA Perorangan",
      color: "hsl(var(--chart-4))",
    },
    "SMA Beregu": {
      label: "SMA Beregu",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Diagram Garis */}
        <Card className="bg-white">
          <CardHeader className="p-2">
            <CardTitle className="text-base text-center">Statistik Pendaftaran Peserta</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={lineChartConfig} className="aspect-auto h-[250px] w-full">
              <LineChart
                accessibilityLayer
                data={lineChartData}
                margin={{left: 12, right: 12}}
              >
                <CartesianGrid />
                <XAxis 
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="registrants"
                  type="linear"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Diagram Lingkaran */}
        <Card className="bg-white">
          <CardHeader className="p-2">
            <CardTitle className="text-base text-center">Peserta Per Jenjang</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={pieChartConfig} className="aspect-auto h-[250px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent className="w-[170px]"/>}/>
                <Pie data={pieChartData} nameKey="category" dataKey="participants" />
                <ChartLegend
                  content={<ChartLegendContent nameKey="category" payload={undefined} />}
                  className="flex-wrap gap-2 justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default EventDashboardChart;