"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const newsletterApi_1 = require("@/redux/api/features/newsletter/newsletterApi");
const table_1 = require("@/components/ui/table");
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const skeleton_1 = require("@/components/ui/skeleton");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const Page = () => {
    const { data, isLoading } = (0, newsletterApi_1.useGetAllNewsLetterQuery)(undefined);
    if (isLoading) {
        return (React.createElement("div", { className: "flex flex-col gap-8" },
            React.createElement(skeleton_1.Skeleton, { className: "h-12 w-1/3" }),
            React.createElement(skeleton_1.Skeleton, { className: "h-64 w-full" })));
    }
    const newsLetters = data?.data || [];
    return (React.createElement("div", null,
        React.createElement("div", { className: "flex flex-col gap-8" },
            React.createElement("div", { className: "flex flex-col gap-2" },
                React.createElement("h1", { className: "text-3xl font-bold tracking-tight" }, "NewsLetter subscribers"),
                React.createElement("p", { className: "text-muted-foreground" }, "View All newsLetter subscribers")),
            React.createElement("div", { className: "rounded-md border" },
                React.createElement(table_1.Table, null,
                    React.createElement(table_1.TableHeader, null,
                        React.createElement(table_1.TableRow, null,
                            React.createElement(table_1.TableHead, null, "User Email"),
                            React.createElement(table_1.TableHead, null, "Created At"),
                            React.createElement(table_1.TableHead, { className: "text-right" }, "Actions"))),
                    React.createElement(table_1.TableBody, null, newsLetters.length === 0 ? (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: 5, className: "text-center h-24" }, "No NewsLetter Subscribers found."))) : (newsLetters.map((product) => (React.createElement(table_1.TableRow, { key: product._id },
                        React.createElement(table_1.TableCell, { className: "font-medium" }, product.email),
                        React.createElement(table_1.TableCell, null, (0, utils_1.formatDate)(product.createdAt)),
                        React.createElement(table_1.TableCell, { className: "text-right" },
                            React.createElement(dropdown_menu_1.DropdownMenu, null,
                                React.createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
                                    React.createElement(button_1.Button, { variant: "ghost", size: "icon" },
                                        React.createElement(lucide_react_1.MoreHorizontal, { className: "h-4 w-4" }),
                                        React.createElement("span", { className: "sr-only" }, "Open menu"))),
                                React.createElement(dropdown_menu_1.DropdownMenuContent, { align: "end" },
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: () => {
                                            navigator.clipboard.writeText(product.email);
                                        } },
                                        React.createElement(lucide_react_1.Copy, { className: "mr-2 h-4 w-4" }),
                                        "Copy"))))))))))))));
};
exports.default = Page;
