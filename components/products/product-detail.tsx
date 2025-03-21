import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface ProductDetailProps {
  product: {
    _id: string
    name: string
    description: string
    image?: string
    createdAt: string
    updatedAt: string
  }
}

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Product Details</CardTitle>
        <Button asChild variant="outline" size="sm">
          <Link href={`/dashboard/products/edit/${product._id}`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
            <p className="text-base">{product.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Created At</h3>
            <p className="text-base">{formatDate(product.createdAt)}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
            <p className="text-base">{formatDate(product.updatedAt)}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
            <p className="text-base text-xs md:text-sm font-mono">{product._id}</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
          <p className="text-base">{product.description}</p>
        </div>
        {product.image && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Image</h3>
            <div className="mt-2 w-full max-w-md">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="rounded-md border object-cover w-full h-auto max-h-[200px]"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

