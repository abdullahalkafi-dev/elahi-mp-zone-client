import { ProductForm } from "@/components/products/product-form"

export default function NewProductPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Create New Product</h1>
        <p className="text-muted-foreground">Add a new product to your inventory</p>
      </div>
      <ProductForm />
    </div>
  )
}

