"use client";

import { useParams } from "next/navigation";

import { ProductForm } from "@/components/products/product-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSingleProductQuery } from "@/redux/api/features/product/productApi";

export default function EditProductPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleProductQuery(id as string);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !data) {
    return <div>Error loading product</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        <p className="text-muted-foreground">Update product information</p>
      </div>
      <ProductForm product={data.data} />
    </div>
  );
}
