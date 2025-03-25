"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NewVariantPage;
const navigation_1 = require("next/navigation");
const variant_form_1 = require("@/components/variants/variant-form");
function NewVariantPage() {
    const { productId } = (0, navigation_1.useParams)();
    return (React.createElement("div", { className: "flex flex-col gap-8" },
        React.createElement("div", { className: "flex flex-col gap-2" },
            React.createElement("h1", { className: "text-3xl font-bold tracking-tight" }, "Create New Variant"),
            React.createElement("p", { className: "text-muted-foreground" }, "Add a new variant to your product")),
        React.createElement(variant_form_1.VariantForm, { productId: productId })));
}
