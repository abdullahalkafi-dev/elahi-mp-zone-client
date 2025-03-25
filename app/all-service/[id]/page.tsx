"use client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getServiceById } from "@/lib/data";
import { useGetSingleProductQuery } from "@/redux/api/features/product/productApi";

interface ServiceDetailPageProps {
  params: {
    id: string;
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { data, isLoading } = useGetSingleProductQuery(params.id);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const product = data.data;
  if (!product) {
    notFound();
  }
  console.log(product);

  const hasVariants = product.variants.length > 0;
  const variants = product.variants;
  // Create WhatsApp URL with encoded message
  console.log(process.env.WhatsAppNumber);
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WhatsAppNumber}?text=${encodeURIComponent(
    `Hello, I am interested in your service: ${product.name}`
  )}`;
  return (
    <div className="container mx-auto py-12 px-4">
      <Link
        href="/services"
        className="inline-flex items-center mb-8 hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Services
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product?.image || "/placeholder.svg"}
              alt={product?.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {product.description}
          </p>

          {hasVariants ? (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Available Options</h2>
              <div className="space-y-4">
                {variants.map((variant: any) => (
                  <Card key={variant._id}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{variant.variant}</h3>
                      </div>
                      <div className="text-xl font-bold text-[#00CDFE]">
                        ৳{variant.price}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <Badge variant="outline" className="text-base px-3 py-1">
                Contact for pricing
              </Badge>
            </div>
          )}

          <Separator className="my-8" />
          <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Created: {new Date(product.createdAt).toLocaleDateString()}
              </p>
              <Button size="lg" className="w-full md:w-auto">
                Request Quote
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
