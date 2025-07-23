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
import { Participant } from "../participant/dto";

interface EventDashboardChartProps {
  eventId: string | null;
  participantsAll?: Participant[];
  participantsPaid?: Participant[];
}

const EventDashboardChart = ({ eventId, participantsAll, participantsPaid }: EventDashboardChartProps) => {
  const generateLineChartData = () => {
    if (!participantsAll || participantsAll.length === 0) {
      return [
        { month: "Januari", registrants: 0 },
        { month: "Februari", registrants: 0 },
        { month: "Maret", registrants: 0 },
        { month: "April", registrants: 0 },
        { month: "Mei", registrants: 0 },
        { month: "Juni", registrants: 0 },
      ];
    }

    // Group participants by month
    const monthlyData: { [key: string]: number } = {};
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    participantsAll.forEach(participant => {
      const date = new Date(participant.created_at);
      const monthIndex = date.getMonth();
      const monthName = monthNames[monthIndex];
      monthlyData[monthName] = (monthlyData[monthName] || 0) + 1;
    });

    // Convert to chart format
    return monthNames.map(month => ({
      month,
      registrants: monthlyData[month] || 0
    }));
  };

  // Generate pie chart data from participants' categories
  const generatePieChartData = () => {
    if (!participantsPaid || participantsPaid.length === 0) {
      return [
        {
          category: "tidak-ada-data",
          categoryName: "Tidak Ada Data",
          participants: 0,
          fill: "var(--color-tidak-ada-data)"
        }
      ];
    }

    // Group participants by category
    const categoryData: { [key: string]: number } = {};

    participantsPaid.forEach(participant => {
      const categoryName = participant.category?.name || "Tidak Berkategori";
      categoryData[categoryName] = (categoryData[categoryName] || 0) + 1;
    });

    // Convert to chart format with proper keys and chart variable prefixes
    return Object.entries(categoryData).map(([categoryName, count]) => {
      const categoryKey = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      return {
        category: categoryKey,
        categoryName: categoryName,
        participants: count,
        fill: `var(--color-${categoryKey})`
      };
    });
  };

  const lineChartData = generateLineChartData();
  const pieChartData = generatePieChartData();

  const lineChartConfig = {
    registrants: {
      label: "Pendaftar",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  // Generate pie chart config dynamically based on categories
  const pieChartConfig = pieChartData.reduce((config, item, index) => {
    const colors = [
      "hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))",
      "hsl(var(--chart-4))", "hsl(var(--chart-5))"
    ];

    config[item.category] = {
      label: item.categoryName,
      color: colors[index % colors.length],
    };
    return config;
  }, {} as Record<string, { label: string; color: string }>) satisfies ChartConfig;

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
                margin={{ left: 12, right: 12 }}
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
                <ChartTooltip content={<ChartTooltipContent className="w-[170px]" />} />
                <Pie
                  data={pieChartData}
                  nameKey="category"
                  dataKey="participants"
                />
                <ChartLegend
                  content={<ChartLegendContent nameKey="category" />}
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