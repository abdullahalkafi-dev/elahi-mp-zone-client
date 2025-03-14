import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ServiceCardProps {
  id: string
  name: string
  description: string
  image: string
}

export function ServiceCard({ id, name, description, image }: ServiceCardProps) {
  return (
    <Card className="h-full flex flex-col shadow-lg bg-white border-[#00CDFE]">
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className=""
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1 text-[#00CDFE]">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/all-service/${id}`} className="w-full">
          <Button className="w-full bg-[#00CDFE] text-white hover:bg-white hover:border-2 hover:border-[#00CDFE] hover:text-[#00CDFE]">See More</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

