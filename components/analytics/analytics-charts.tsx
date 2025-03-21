"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SalesEntry } from "@/app/dashboard/analytics/page";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface AnalyticsChartsProps {
  salesData: SalesEntry[];
}

export function AnalyticsCharts({ salesData }: AnalyticsChartsProps) {
  const [chartType, setChartType] = useState("revenue");

  // Prepare data for bar chart
  const barChartData = salesData.map((entry) => ({
    name: `${entry.productName} - ${entry.variantName}`,
    sales: entry.totalSales,
    loss: entry.totalLoss,
    revenue: entry.totalRevenue,
  }));

  // Prepare data for pie chart
  const pieChartData = [
    {
      name: "Total Revenue",
      value: salesData.reduce((sum, entry) => sum + entry.totalRevenue, 0),
      color: "#22c55e", // green
    },
    {
      name: "Total Loss",
      value: salesData.reduce((sum, entry) => sum + entry.totalLoss, 0),
      color: "#ef4444", // red
    },
  ];

  // Prepare data for product comparison
  const productComparisonData = salesData.map((entry) => ({
    name: `${entry.productName} - ${entry.variantName}`,
    unitsSold: entry.unitsSold,
    deliveryLoss: entry.deliveryLoss,
  }));

  if (salesData.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/20">
        <h3 className="text-lg font-medium">No analytics data yet</h3>
        <p className="text-muted-foreground mt-1">
          Add product sales data to see analytics charts
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Revenue Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
