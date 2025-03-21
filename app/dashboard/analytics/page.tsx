"use client";

import { useState, useEffect } from "react";

import { AnalyticsForm } from "@/components/analytics/analytics-form";
import { AnalyticsSummary } from "@/components/analytics/analytics-summary";
import { AnalyticsTable } from "@/components/analytics/analytics-table";
import { AnalyticsCharts } from "@/components/analytics/analytics-charts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllProductsQuery } from "@/redux/api/features/product/productApi";

export interface SalesEntry {
  id: string;
  productId: string;
  productName: string;
  variantId: string;
  variantName: string;
  price: number;
  unitsSold: number;
  deliveryLoss: number;
  totalSales: number;
  totalLoss: number;
  totalRevenue: number;
}

export default function AnalyticsPage() {
  const { data, isLoading } = useGetAllProductsQuery({});
  const [salesData, setSalesData] = useState<SalesEntry[]>([]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("salesData");
    if (savedData) {
      setSalesData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("salesData", JSON.stringify(salesData));
  }, [salesData]);

  const addSalesEntry = (entry: SalesEntry) => {
    // Check if entry with same product and variant already exists
    const existingIndex = salesData.findIndex(
      (item) =>
        item.productId === entry.productId && item.variantId === entry.variantId
    );

    if (existingIndex >= 0) {
      // Update existing entry
      const updatedData = [...salesData];
      updatedData[existingIndex] = entry;
      setSalesData(updatedData);
    } else {
      // Add new entry
      setSalesData([...salesData, entry]);
    }
  };

  const removeSalesEntry = (id: string) => {
    setSalesData(salesData.filter((entry) => entry.id !== id));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const products = data?.data || [];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Track sales, revenue, and delivery losses for your products
        </p>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="data">Data Entry</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-6">
          <AnalyticsSummary salesData={salesData} />
        </TabsContent>

        <TabsContent value="data" className="mt-6">
          <AnalyticsForm
            products={products}
            onSubmit={addSalesEntry}
            existingData={salesData}
          />
        </TabsContent>

        <TabsContent value="table" className="mt-6">
          <AnalyticsTable salesData={salesData} onDelete={removeSalesEntry} />
        </TabsContent>

        <TabsContent value="charts" className="mt-6">
          <AnalyticsCharts salesData={salesData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
