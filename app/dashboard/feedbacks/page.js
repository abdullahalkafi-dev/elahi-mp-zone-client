"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("@/components/ui/table");
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const skeleton_1 = require("@/components/ui/skeleton");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const FeedbackApi_1 = require("@/redux/api/features/feedback/FeedbackApi");
const avatar_1 = require("@/components/ui/avatar");
const Page = () => {
    const { data, isLoading } = (0, FeedbackApi_1.useGetAllFeedbacksQuery)(undefined);
    const [toggleFeedback] = (0, FeedbackApi_1.useToggleFeedbackMutation)();
    if (isLoading) {
        return (React.createElement("div", { className: "flex flex-col gap-8" },
            React.createElement(skeleton_1.Skeleton, { className: "h-12 w-1/3" }),
            React.createElement(skeleton_1.Skeleton, { className: "h-64 w-full" })));
    }
    const feedbacks = data?.data || [];
    return (React.createElement("div", null,
        React.createElement("div", { className: "flex flex-col gap-8" },
            React.createElement("div", { className: "flex flex-col gap-2" },
                React.createElement("h1", { className: "text-3xl font-bold tracking-tight" }, "User Feedbacks"),
                React.createElement("p", { className: "text-muted-foreground" }, "View and manage all user feedbacks")),
            React.createElement("div", { className: "rounded-md border" },
                React.createElement(table_1.Table, null,
                    React.createElement(table_1.TableHeader, null,
                        React.createElement(table_1.TableRow, null,
                            React.createElement(table_1.TableHead, null, "User"),
                            React.createElement(table_1.TableHead, null, "Profession"),
                            React.createElement(table_1.TableHead, null, "Feedback"),
                            React.createElement(table_1.TableHead, null, "Status"),
                            React.createElement(table_1.TableHead, null, "Created At"),
                            React.createElement(table_1.TableHead, { className: "text-right" }, "Actions"))),
                    React.createElement(table_1.TableBody, null, feedbacks.length === 0 ? (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: 6, className: "text-center h-24" }, "No feedbacks found."))) : (feedbacks.map((feedback) => (React.createElement(table_1.TableRow, { key: feedback._id },
                        React.createElement(table_1.TableCell, null,
                            React.createElement("div", { className: "flex items-center gap-3" },
                                React.createElement(avatar_1.Avatar, null,
                                    React.createElement(avatar_1.AvatarImage, { src: feedback.user.image, alt: feedback.user.name }),
                                    React.createElement(avatar_1.AvatarFallback, null, feedback.user.name.charAt(0))),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "font-medium" }, feedback.user.name),
                                    React.createElement("p", { className: "text-sm text-muted-foreground" }, feedback.user.email)))),
                        React.createElement(table_1.TableCell, null, feedback.profession),
                        React.createElement(table_1.TableCell, { className: "max-w-[300px] truncate" }, feedback.feedback),
                        React.createElement(table_1.TableCell, null,
                            React.createElement("span", { className: `px-2 py-1 rounded-full text-xs ${feedback.isHidden ? 'bg-gray-200' : 'bg-green-100 text-green-800'}` }, feedback.isHidden ? 'Hidden' : 'Visible')),
                        React.createElement(table_1.TableCell, null, (0, utils_1.formatDate)(feedback.createdAt)),
                        React.createElement(table_1.TableCell, { className: "text-right" },
                            React.createElement(dropdown_menu_1.DropdownMenu, null,
                                React.createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
                                    React.createElement(button_1.Button, { variant: "ghost", size: "icon" },
                                        React.createElement(lucide_react_1.MoreHorizontal, { className: "h-4 w-4" }),
                                        React.createElement("span", { className: "sr-only" }, "Open menu"))),
                                React.createElement(dropdown_menu_1.DropdownMenuContent, { align: "end" },
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: () => toggleFeedback(feedback._id) },
                                        React.createElement(lucide_react_1.Eye, { className: "mr-2 h-4 w-4" }),
                                        feedback.isHidden ? 'Show' : 'Hide',
                                        " Feedback"),
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: () => {
                                            navigator.clipboard.writeText(feedback.feedback);
                                        } },
                                        React.createElement(lucide_react_1.Copy, { className: "mr-2 h-4 w-4" }),
                                        "Copy Feedback"))))))))))))));
};
exports.default = Page;
