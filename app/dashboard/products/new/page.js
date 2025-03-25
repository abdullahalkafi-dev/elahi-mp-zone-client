"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NewProductPage;
const product_form_1 = require("@/components/products/product-form");
function NewProductPage() {
    return (React.createElement("div", { className: "flex flex-col gap-8" },
        React.createElement("div", { className: "flex flex-col gap-2" },
            React.createElement("h1", { className: "text-3xl font-bold tracking-tight" }, "Create New Product"),
            React.createElement("p", { className: "text-muted-foreground" }, "Add a new product to your inventory")),
        React.createElement(product_form_1.ProductForm, null)));
}
