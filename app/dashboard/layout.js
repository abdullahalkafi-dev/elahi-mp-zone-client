"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardLayout;
const dashboard_sidebar_1 = require("@/components/dashboard/dashboard-sidebar");
const dashboard_header_1 = require("@/components/dashboard/dashboard-header");
function DashboardLayout({ children, }) {
    return (React.createElement("div", { className: "flex min-h-screen flex-col" },
        React.createElement(dashboard_header_1.DashboardHeader, null),
        React.createElement("div", { className: "flex flex-1" },
            React.createElement(dashboard_sidebar_1.DashboardSidebar, null),
            React.createElement("main", { className: "flex-1 p-6 md:p-8" }, children))));
}
