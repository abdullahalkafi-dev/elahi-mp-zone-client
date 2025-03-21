"use client"

import { useParams } from "next/navigation"
import { VariantForm } from '@/components/variants/variant-form';


export default function NewVariantPage() {
  const { productId } = useParams()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Create New Variant</h1>
        <p className="text-muted-foreground">Add a new variant to your product</p>
      </div>
      <VariantForm productId={productId as string} />
    </div>
  )
}

