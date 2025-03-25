"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AnalyticsTable;
const react_1 = require("react");
const table_1 = require("@/components/ui/table");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const lucide_react_1 = require("lucide-react");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const analyticsApi_1 = require("@/redux/api/features/analytics/analyticsApi");
const skeleton_1 = require("@/components/ui/skeleton");
const utils_1 = require("@/lib/utils");
function AnalyticsTable() {
    const [searchTerm, setSearchTerm] = (0, react_1.useState)("");
    const [deleteId, setDeleteId] = (0, react_1.useState)(null);
    const { data, isLoading } = (0, analyticsApi_1.useGetAllAnalyticsQuery)(undefined);
    const [onDelete] = (0, analyticsApi_1.useDeleteAnalyticsMutation)();
    if (isLoading) {
        return React.createElement(skeleton_1.Skeleton, null);
    }
    const allAnalytics = data.data;
    const filteredData = data.data.filter((entry) => entry.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.variant.toLowerCase().includes(searchTerm.toLowerCase()));
    const handleDelete = () => {
        if (deleteId) {
            console.log(deleteId);
            onDelete(deleteId);
            setDeleteId(null);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "flex items-center justify-between mb-4" },
            React.createElement("div", { className: "relative max-w-sm" },
                React.createElement(lucide_react_1.Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
                React.createElement(input_1.Input, { type: "search", placeholder: "Search products...", className: "pl-8 w-full md:w-[300px]", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }))),
        React.createElement("div", { className: "rounded-md border" },
            React.createElement(table_1.Table, null,
                React.createElement(table_1.TableHeader, null,
                    React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableHead, null, "Product"),
                        React.createElement(table_1.TableHead, null, "Variant"),
                        React.createElement(table_1.TableHead, null, "Price"),
                        React.createElement(table_1.TableHead, null, "Units Sold"),
                        React.createElement(table_1.TableHead, null, "Delivery Loss"),
                        React.createElement(table_1.TableHead, null, "Total Sales"),
                        React.createElement(table_1.TableHead, null, "Total Loss"),
                        React.createElement(table_1.TableHead, null, "Total Revenue"),
                        React.createElement(table_1.TableHead, null, "Created At"),
                        React.createElement(table_1.TableHead, { className: "text-right" }, "Actions"))),
                React.createElement(table_1.TableBody, null, filteredData.length === 0 ? (React.createElement(table_1.TableRow, null,
                    React.createElement(table_1.TableCell, { colSpan: 9, className: "text-center h-24" }, allAnalytics.length === 0
                        ? "No analytics data found. Add your first entry to get started."
                        : "No matching products found."))) : (filteredData.map((entry) => (React.createElement(table_1.TableRow, { key: entry.id },
                    React.createElement(table_1.TableCell, { className: "font-medium" }, entry.product),
                    React.createElement(table_1.TableCell, null, entry.variant),
                    React.createElement(table_1.TableCell, null,
                        "$",
                        entry.singleUnitPrice),
                    React.createElement(table_1.TableCell, null, entry.unitsSold),
                    React.createElement(table_1.TableCell, null, entry.deliveryLoss),
                    React.createElement(table_1.TableCell, null,
                        "$",
                        entry.totalSales),
                    React.createElement(table_1.TableCell, { className: "text-destructive" },
                        "$",
                        entry.totalLoss),
                    React.createElement(table_1.TableCell, { className: "text-primary" },
                        "$",
                        entry.totalRevenue),
                    React.createElement(table_1.TableCell, { className: "text-primary" }, (0, utils_1.formatDate)(entry.createdAt)),
                    React.createElement(table_1.TableCell, { className: "text-right" },
                        React.createElement(dropdown_menu_1.DropdownMenu, null,
                            React.createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
                                React.createElement(button_1.Button, { variant: "ghost", size: "icon" },
                                    React.createElement(lucide_react_1.MoreHorizontal, { className: "h-4 w-4" }),
                                    React.createElement("span", { className: "sr-only" }, "Open menu"))),
                            React.createElement(dropdown_menu_1.DropdownMenuContent, { align: "end" },
                                React.createElement(dropdown_menu_1.DropdownMenuItem, { className: "text-destructive focus:text-destructive", onClick: () => setDeleteId(entry._id) },
                                    React.createElement(lucide_react_1.Trash2, { className: "mr-2 h-4 w-4" }),
                                    "Delete"))))))))))),
        React.createElement(alert_dialog_1.AlertDialog, { open: !!deleteId, onOpenChange: (open) => !open && setDeleteId(null) },
            React.createElement(alert_dialog_1.AlertDialogContent, null,
                React.createElement(alert_dialog_1.AlertDialogHeader, null,
                    React.createElement(alert_dialog_1.AlertDialogTitle, null, "Are you sure?"),
                    React.createElement(alert_dialog_1.AlertDialogDescription, null, "This action cannot be undone. This will permanently delete this analytics entry.")),
                React.createElement(alert_dialog_1.AlertDialogFooter, null,
                    React.createElement(alert_dialog_1.AlertDialogCancel, null, "Cancel"),
                    React.createElement(alert_dialog_1.AlertDialogAction, { onClick: handleDelete, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90" }, "Delete"))))));
}
