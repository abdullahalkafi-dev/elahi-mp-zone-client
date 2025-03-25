"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { useCreateFeedbackMutation } from "@/redux/api/features/feedback/FeedbackApi";
import { useUser } from "@/hooks/user.hook";
import { useRouter } from "next/navigation";

export default function FeedbackForm() {
  const [createFeedbackHandler, { isLoading }] = useCreateFeedbackMutation();
  const user = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    profession: "",
    feedback: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.profession || !formData.feedback) {
      toast.error("Please fill in all fields");
      return;
    }
    const res: any = await createFeedbackHandler({
      user: user.user._id,
      feedback: formData.feedback,
      profession: formData.profession,
    });
    if (res.data) {
      toast.success("Feedback submitted successfully");
    }
    if (res.error) {
      toast.error(res.error.data.message);
    }
    router.push("/");
    setFormData({
      profession: "",
      feedback: "",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto border border-[#00CDFE] bg-white shadow-lg">
      {/* 👆 Added shadow-lg here */}
      <CardHeader>
        <CardTitle className="text-2xl text-[#00CDFE]">
          Share Your Feedback
        </CardTitle>
        <CardDescription>
          We value your opinion and would love to hear from you.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profession" className="text-[#00CDFE]">
              Profession
            </Label>
            <Input
              id="profession"
              name="profession"
              placeholder="Enter your profession"
              value={formData.profession}
              onChange={handleChange}
              className="bg-white border-[#00CDFE]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-[#00CDFE]">
              Your Feedback
            </Label>
            <Textarea
              id="feedback"
              name="feedback"
              placeholder="Please share your thoughts, suggestions, or experiences..."
              value={formData.feedback}
              onChange={handleChange}
              className="bg-white border-[#00CDFE]  min-h-[120px] "
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-[#00CDFE] hover:bg-[#00b9e6] text-white"
          >
            Submit Feedback
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
