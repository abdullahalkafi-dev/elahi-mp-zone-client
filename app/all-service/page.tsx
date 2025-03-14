
import { services } from "@/lib/data";
import image1 from "../../public/cup-product.jpg";
import image2 from "../../public/pen-design.webp";
import image3 from "../../public/t-shirt.png";
import { ServiceCard } from "@/components/service-card"




export default function ServicesPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-[#00CDFE] mb-4">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore our wide range of high-quality printing and customization services
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.product._id}
            id={service.product._id}
            name={service.product.name}
            description={service.product.description}
            image={service.product.image}
          />
        ))}
      </div>
    </div>
    </div>
  )
}

