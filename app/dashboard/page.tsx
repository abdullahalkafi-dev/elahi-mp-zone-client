import { DashboardCards } from "@/components/dashboard/dashboard-cards"
import { RecentProducts } from "@/components/dashboard/recent-products"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your product management system</p>
      </div>
      <DashboardCards />
      <RecentProducts />
    </div>
  )
}

