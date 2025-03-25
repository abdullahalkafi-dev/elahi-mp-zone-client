"use client";

import { useGetAllNewsLetterQuery } from "@/redux/api/features/newsletter/newsletterApi";



import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal, Pencil, Trash2, Eye, Plus, Copy } from "lucide-react";
import { formatDate } from "@/lib/utils";

const Page = () => {
  const { data, isLoading } = useGetAllNewsLetterQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const newsLetters = data?.data || [];
  return (
    <div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            NewsLetter subscribers
          </h1>
          <p className="text-muted-foreground">
            View All newsLetter subscribers
          </p>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Email</TableHead>

                <TableHead>Created At</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsLetters.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No NewsLetter Subscribers found.
                  </TableCell>
                </TableRow>
              ) : (
                newsLetters.map((product: any) => (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium">
                      {product.email}
                    </TableCell>

                    <TableCell>{formatDate(product.createdAt)}</TableCell>

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
                            onClick={() => {
                              navigator.clipboard.writeText(product.email);
                            }}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
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
      </div>
    </div>
  );
};

export default Page;
