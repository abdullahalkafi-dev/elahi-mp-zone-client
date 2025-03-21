"use client"

import { useParams } from "next/navigation"
import { VariantForm } from "@/components/variants/variant-form"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetVariantByIdQuery } from "@/redux/api/features/product/productApi"

export default function EditVariantPage() {
  const { id } = useParams()
  const { data, isLoading, error } = useGetVariantByIdQuery(id as string)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (error || !data) {
    return <div>Error loading variant</div>
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Variant</h1>
        <p className="text-muted-foreground">Update variant information</p>
      </div>
      <VariantForm variant={data.data} />
    </div>
  )
}

