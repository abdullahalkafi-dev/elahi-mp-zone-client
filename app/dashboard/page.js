"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardPage;
const dashboard_cards_1 = require("@/components/dashboard/dashboard-cards");
const recent_products_1 = require("@/components/dashboard/recent-products");
function DashboardPage() {
    return (React.createElement("div", { className: "flex flex-col gap-8" },
        React.createElement("div", { className: "flex flex-col gap-2" },
            React.createElement("h1", { className: "text-3xl font-bold tracking-tight" }, "Dashboard"),
            React.createElement("p", { className: "text-muted-foreground" }, "Overview of your product management system")),
        React.createElement(dashboard_cards_1.DashboardCards, null),
        React.createElement(recent_products_1.RecentProducts, null)));
}
