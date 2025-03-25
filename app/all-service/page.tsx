"use client"
import { services } from "@/lib/data";
import image1 from "../../public/cup-product.jpg";
import image2 from "../../public/pen-design.webp";
import image3 from "../../public/t-shirt.png";
import { ServiceCard } from "@/components/service-card";
import { useGetAllProductsQuery } from "@/redux/api/features/product/productApi";

export default function ServicesPage() {
  const { data, isLoading } = useGetAllProductsQuery({});
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const products = data.data;
  return (
    <div className="bg-white">
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-[#00CDFE] mb-4">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our wide range of high-quality printing and customization
            services
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ServiceCard
              key={product._id}
              id={product._id}
              name={product.name}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
