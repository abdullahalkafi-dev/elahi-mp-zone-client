"use client";

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
import { MoreHorizontal, Eye, Copy } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useGetAllFeedbacksQuery, useToggleFeedbackMutation } from "@/redux/api/features/feedback/FeedbackApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Page = () => {
    const { data, isLoading } = useGetAllFeedbacksQuery(undefined);
    const [toggleFeedback] = useToggleFeedbackMutation();

    if (isLoading) {
        return (
            <div className="flex flex-col gap-8">
                <Skeleton className="h-12 w-1/3" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    const feedbacks = data?.data || [];
    
    return (
        <div>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        User Feedbacks
                    </h1>
                    <p className="text-muted-foreground">
                        View and manage all user feedbacks
                    </p>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Profession</TableHead>
                                <TableHead>Feedback</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {feedbacks.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24">
                                        No feedbacks found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                feedbacks.map((feedback: any) => (
                                    <TableRow key={feedback._id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={feedback.user.image} alt={feedback.user.name} />
                                                    <AvatarFallback>{feedback.user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{feedback.user.name}</p>
                                                    <p className="text-sm text-muted-foreground">{feedback.user.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{feedback.profession}</TableCell>
                                        <TableCell className="max-w-[300px] truncate">{feedback.feedback}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs ${feedback.isHidden ? 'bg-gray-200' : 'bg-green-100 text-green-800'}`}>
                                                {feedback.isHidden ? 'Hidden' : 'Visible'}
                                            </span>
                                        </TableCell>
                                        <TableCell>{formatDate(feedback.createdAt)}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => toggleFeedback(feedback._id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        {feedback.isHidden ? 'Show' : 'Hide'} Feedback
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(feedback.feedback);
                                                        }}
                                                    >
                                                        <Copy className="mr-2 h-4 w-4" />
                                                        Copy Feedback
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
