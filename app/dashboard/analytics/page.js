"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AnalyticsPage;
const react_1 = require("react");
const analytics_form_1 = require("@/components/analytics/analytics-form");
const analytics_summary_1 = require("@/components/analytics/analytics-summary");
const analytics_table_1 = require("@/components/analytics/analytics-table");
const analytics_charts_1 = require("@/components/analytics/analytics-charts");
const tabs_1 = require("@/components/ui/tabs");
const skeleton_1 = require("@/components/ui/skeleton");
const productApi_1 = require("@/redux/api/features/product/productApi");
function AnalyticsPage() {
    const { data, isLoading } = (0, productApi_1.useGetAllProductsQuery)({});
    const [salesData, setSalesData] = (0, react_1.useState)([]);
    // Load saved data from localStorage on component mount
    (0, react_1.useEffect)(() => {
        const savedData = localStorage.getItem("salesData");
        if (savedData) {
            setSalesData(JSON.parse(savedData));
        }
    }, []);
    // Save data to localStorage whenever it changes
    (0, react_1.useEffect)(() => {
        localStorage.setItem("salesData", JSON.stringify(salesData));
    }, [salesData]);
    const addSalesEntry = (entry) => {
        // Check if entry with same product and variant already exists
        const existingIndex = salesData.findIndex((item) => item.productId === entry.productId && item.variantId === entry.variantId);
        if (existingIndex >= 0) {
            // Update existing entry
            const updatedData = [...salesData];
            updatedData[existingIndex] = entry;
            setSalesData(updatedData);
        }
        else {
            // Add new entry
            setSalesData([...salesData, entry]);
        }
    };
    const removeSalesEntry = (id) => {
        setSalesData(salesData.filter((entry) => entry.id !== id));
    };
    if (isLoading) {
        return (React.createElement("div", { className: "flex flex-col gap-8" },
            React.createElement(skeleton_1.Skeleton, { className: "h-12 w-1/3" }),
            React.createElement(skeleton_1.Skeleton, { className: "h-64 w-full" }),
            React.createElement(skeleton_1.Skeleton, { className: "h-96 w-full" })));
    }
    const products = data?.data || [];
    return (React.createElement("div", { className: "flex flex-col gap-8" },
        React.createElement("div", { className: "flex flex-col gap-2" },
            React.createElement("h1", { className: "text-3xl font-bold tracking-tight" }, "Analytics"),
            React.createElement("p", { className: "text-muted-foreground" }, "Track sales, revenue, and delivery losses for your products")),
        React.createElement(tabs_1.Tabs, { defaultValue: "summary", className: "w-full" },
            React.createElement(tabs_1.TabsList, { className: "grid w-full grid-cols-4" },
                React.createElement(tabs_1.TabsTrigger, { value: "summary" }, "Summary"),
                React.createElement(tabs_1.TabsTrigger, { value: "data" }, "Data Entry"),
                React.createElement(tabs_1.TabsTrigger, { value: "table" }, "Table View"),
                React.createElement(tabs_1.TabsTrigger, { value: "charts" }, "Charts")),
            React.createElement(tabs_1.TabsContent, { value: "summary", className: "mt-6" },
                React.createElement(analytics_summary_1.AnalyticsSummary, { salesData: salesData })),
            React.createElement(tabs_1.TabsContent, { value: "data", className: "mt-6" },
                React.createElement(analytics_form_1.AnalyticsForm, { products: products, onSubmit: addSalesEntry, existingData: salesData })),
            React.createElement(tabs_1.TabsContent, { value: "table", className: "mt-6" },
                React.createElement(analytics_table_1.AnalyticsTable, { salesData: salesData, onDelete: removeSalesEntry })),
            React.createElement(tabs_1.TabsContent, { value: "charts", className: "mt-6" },
                React.createElement(analytics_charts_1.AnalyticsCharts, { salesData: salesData })))));
}
