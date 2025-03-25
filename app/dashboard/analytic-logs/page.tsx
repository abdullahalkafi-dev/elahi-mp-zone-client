"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2, Search } from "lucide-react";
import type { SalesEntry } from "@/app/dashboard/analytics/page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useDeleteAnalyticsMutation,
  useGetAllAnalyticsQuery,
} from "@/redux/api/features/analytics/analyticsApi";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";

export default function AnalyticsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data, isLoading } = useGetAllAnalyticsQuery(undefined);
  const [onDelete] = useDeleteAnalyticsMutation();
  if (isLoading) {
    return <Skeleton />;
  }
  const allAnalytics = data.data;
  const filteredData = data.data.filter(
    (entry: any) =>
      entry.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.variant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    if (deleteId) {
      console.log(deleteId);
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Variant</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Units Sold</TableHead>
              <TableHead>Delivery Loss</TableHead>
              <TableHead>Total Sales</TableHead>
              <TableHead>Total Loss</TableHead>
              <TableHead>Total Revenue</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center h-24">
                  {allAnalytics.length === 0
                    ? "No analytics data found. Add your first entry to get started."
                    : "No matching products found."}
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((entry: any) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.product}</TableCell>
                  <TableCell>{entry.variant}</TableCell>
                  <TableCell>${entry.singleUnitPrice}</TableCell>
                  <TableCell>{entry.unitsSold}</TableCell>
                  <TableCell>{entry.deliveryLoss}</TableCell>
                  <TableCell>${entry.totalSales}</TableCell>
                  <TableCell className="text-destructive">
                    ${entry.totalLoss}
                  </TableCell>
                  <TableCell className="text-primary">
                    ${entry.totalRevenue}
                  </TableCell>
                  <TableCell className="text-primary">
                    {formatDate(entry.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteId(entry._id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              analytics entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
