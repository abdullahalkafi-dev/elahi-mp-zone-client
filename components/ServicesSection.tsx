import Image from "next/image";
import {
  Printer,
  Users,
  Laptop,
  PenTool,
  Globe,
  Headphones,
} from "lucide-react";
import image1 from "../public/cup-product.jpg";
import image2 from "../public/pen-design.webp";
import image3 from "../public/t-shirt.png";
const services = [
  {
    title: "Cup Design",
    description:
      "A sleek, modern cup with a matte black finish, a gold-rimmed edge, and an ergonomic handle for a comfortable grip. Simple yet elegant! ☕✨",
    image: image1,
  },
  {
    title: "Pen Design",
    description:
      "A stylish pen with a matte black body, gold accents, and a smooth grip for comfort. Sleek, professional, and perfect for any writing experience! ✍️✨",
    image: image2,
  },
  {
    title: "T-Shirt Design",
    description:
      "A sleek black T-shirt with a minimalist gold logo on the chest, offering a comfortable fit and made from soft, high-quality fabric. Simple yet stylish, perfect for any occasion!",
    image: image3,
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 px-4 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-[#00CDFE] font-medium mb-4">WHAT WE PROVIDE</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Let's find the service that's right for you
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Taciti integer faucibus sollicitudin eros dolor fusce quam dapibus
            vulputate himenaeos ullamcorper consectetuer pede porttitor
            ultricies maximus nostra consectetur gravida risus lobortis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-black">
                      {service.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
