"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "../ui/use-toast"
import { useCreateProductVariantMutation, useUpdateVariantMutation } from "@/redux/api/features/product/productApi"


interface VariantFormProps {
  variant?: {
    _id: string
    productId: string
    variant: string
    price: number
  }
  productId?: string
}

export function VariantForm({ variant, productId }: VariantFormProps) {
  const router = useRouter()


  const [createVariant, { isLoading: isCreating }] = useCreateProductVariantMutation()
  const [updateVariant, { isLoading: isUpdating }] = useUpdateVariantMutation()

  const isSubmitting = isCreating || isUpdating

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      variant: variant?.variant || "",
      price: variant?.price || 0,
    },
  })

  const onSubmit = async (data: any) => {
    try {
      if (variant) {
        await updateVariant({ id: variant._id, body: data }).unwrap()
        toast({
          title: "Variant updated",
          description: "The variant has been updated successfully.",
        })
        router.push(`/dashboard/products/${variant.productId}`)
      } else if (productId) {
        await createVariant({ productId, ...data }).unwrap()
        toast({
          title: "Variant created",
          description: "The variant has been created successfully.",
        })
        router.push(`/dashboard/products/${productId}`)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save variant. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="variant">Variant Name</Label>
            <Input id="variant" {...register("variant", { required: "Variant name is required" })} />
            {errors.variant && <p className="text-sm text-destructive">{errors.variant.message as string}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be greater than or equal to 0" },
              })}
            />
            {errors.price && <p className="text-sm text-destructive">{errors.price.message as string}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : variant ? "Update Variant" : "Create Variant"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

