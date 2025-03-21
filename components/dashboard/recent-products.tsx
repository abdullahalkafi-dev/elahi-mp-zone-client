"use client"

import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/lib/utils"
import { useGetAllProductsQuery } from "@/redux/api/features/product/productApi"
import Image from "next/image"

export function RecentProducts() {
  const { data, isLoading } = useGetAllProductsQuery(undefined)

  // Get the 5 most recent products
  const products = data?.data || []
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Products</CardTitle>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/products">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="space-y-4">
            {recentProducts.map((product) => (
              <div key={product._id} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                  {product.image ? (
                    <Image
                      src={product.image as string}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-xl font-bold text-muted-foreground">{product.name.charAt(0)}</span>
                  )}
                </div>
                <div className="space-y-1">
                  <Link href={`/dashboard/products/${product._id}`} className="font-medium hover:underline">
                    {product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">Created on {formatDate(product.createdAt)}</p>
                </div>
                <div className="ml-auto text-sm">{product.variants?.length || 0} variants</div>
              </div>
            ))}

            {recentProducts.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                No products found. Create your first product to get started.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

