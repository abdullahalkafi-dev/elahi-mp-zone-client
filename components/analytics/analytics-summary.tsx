import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SalesEntry } from "@/app/dashboard/analytics/page"
import { DollarSign, ShoppingBag, TrendingDown, TrendingUp } from "lucide-react"

interface AnalyticsSummaryProps {
  salesData: SalesEntry[]
}

export function AnalyticsSummary({ salesData }: AnalyticsSummaryProps) {
  // Calculate totals
  const totalSales = salesData.reduce((sum, entry) => sum + entry.totalSales, 0)
  const totalLoss = salesData.reduce((sum, entry) => sum + entry.totalLoss, 0)
  const totalRevenue = salesData.reduce((sum, entry) => sum + entry.totalRevenue, 0)
  const totalUnitsSold = salesData.reduce((sum, entry) => sum + entry.unitsSold, 0)
  const totalDeliveryLoss = salesData.reduce((sum, entry) => sum + entry.deliveryLoss, 0)

  // Calculate percentages
  const lossPercentage = totalSales > 0 ? (totalLoss / totalSales) * 100 : 0
  const revenuePercentage = totalSales > 0 ? (totalRevenue / totalSales) * 100 : 0

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From {totalUnitsSold} units sold</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Loss</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${totalLoss.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {lossPercentage.toFixed(1)}% of total sales ({totalDeliveryLoss} units lost)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{revenuePercentage.toFixed(1)}% of total sales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Tracked</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesData.length}</div>
            <p className="text-xs text-muted-foreground">Product variants being tracked</p>
          </CardContent>
        </Card>
      </div>

      {salesData.length === 0 && (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <h3 className="text-lg font-medium">No analytics data yet</h3>
          <p className="text-muted-foreground mt-1">Add product sales data to see analytics summary</p>
        </div>
      )}
    </div>
  )
}

