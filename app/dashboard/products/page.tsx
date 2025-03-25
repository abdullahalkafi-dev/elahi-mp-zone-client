import { ProductsList } from "@/components/products/products-list"

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">Manage your products and their variants</p>
      </div>
    
      <ProductsList />
    </div>
  )
}

