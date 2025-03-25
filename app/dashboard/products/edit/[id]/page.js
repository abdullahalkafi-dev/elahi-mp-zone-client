"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditProductPage;
const navigation_1 = require("next/navigation");
const product_form_1 = require("@/components/products/product-form");
const skeleton_1 = require("@/components/ui/skeleton");
const productApi_1 = require("@/redux/api/features/product/productApi");
function EditProductPage() {
    const { id } = (0, navigation_1.useParams)();
    const { data, isLoading, error } = (0, productApi_1.useGetSingleProductQuery)(id);
    if (isLoading) {
        return (React.createElement("div", { className: "flex flex-col gap-8" },
            React.createElement(skeleton_1.Skeleton, { className: "h-12 w-1/3" }),
            React.createElement(skeleton_1.Skeleton, { className: "h-64 w-full" })));
    }
    if (error || !data) {
        return React.createElement("div", null, "Error loading product");
    }
    return (React.createElement("div", { className: "flex flex-col gap-8" },
        React.createElement("div", { className: "flex flex-col gap-2" },
            React.createElement("h1", { className: "text-3xl font-bold tracking-tight" }, "Edit Product"),
            React.createElement("p", { className: "text-muted-foreground" }, "Update product information")),
        React.createElement(product_form_1.ProductForm, { product: data.data })));
}
