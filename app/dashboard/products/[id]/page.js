"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductDetailPage;
const navigation_1 = require("next/navigation");
const product_detail_1 = require("@/components/products/product-detail");
const variants_list_1 = require("@/components/variants/variants-list");
const skeleton_1 = require("@/components/ui/skeleton");
const productApi_1 = require("@/redux/api/features/product/productApi");
function ProductDetailPage() {
    const { id } = (0, navigation_1.useParams)();
    const { data, isLoading, error } = (0, productApi_1.useGetProductWithVariantsQuery)(id);
    if (isLoading) {
        return (React.createElement("div", { className: "flex flex-col gap-8" },
            React.createElement(skeleton_1.Skeleton, { className: "h-12 w-1/3" }),
            React.createElement(skeleton_1.Skeleton, { className: "h-64 w-full" }),
            React.createElement(skeleton_1.Skeleton, { className: "h-96 w-full" })));
    }
    if (error || !data) {
        return React.createElement("div", null, "Error loading product details");
    }
    const { product, variants } = data.data;
    return (React.createElement("div", { className: "flex flex-col gap-8" },
        React.createElement("div", { className: "flex flex-col gap-2" },
            React.createElement("h1", { className: "text-3xl font-bold tracking-tight" }, product.name),
            React.createElement("p", { className: "text-muted-foreground" }, "Manage product details and variants")),
        React.createElement(product_detail_1.ProductDetail, { product: product }),
        React.createElement("div", { className: "flex flex-col gap-4" },
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement("h2", { className: "text-2xl font-semibold" }, "Variants")),
            React.createElement(variants_list_1.VariantsList, { variants: variants, productId: id }))));
}
