"use client"

import { useParams } from "next/navigation"
import { ProductDetail } from "@/components/products/product-detail"
import { VariantsList } from "@/components/variants/variants-list"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetProductWithVariantsQuery } from "@/redux/api/features/product/productApi"

export default function ProductDetailPage() {
  const { id } = useParams()
  const { data, isLoading, error } = useGetProductWithVariantsQuery(id as string)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (error || !data) {
    return <div>Error loading product details</div>
  }

  const { product, variants } = data.data

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
        <p className="text-muted-foreground">Manage product details and variants</p>
      </div>
      <ProductDetail product={product} />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Variants</h2>
        </div>
        <VariantsList variants={variants} productId={id as string} />
      </div>
    </div>
  )
}

