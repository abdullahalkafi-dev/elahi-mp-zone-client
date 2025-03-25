"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductsPage;
const products_list_1 = require("@/components/products/products-list");
function ProductsPage() {
    return (React.createElement("div", { className: "flex flex-col gap-8" },
        React.createElement("div", { className: "flex flex-col gap-2" },
            React.createElement("h1", { className: "text-3xl font-bold tracking-tight" }, "Products"),
            React.createElement("p", { className: "text-muted-foreground" }, "Manage your products and their variants")),
        React.createElement(products_list_1.ProductsList, null)));
}
