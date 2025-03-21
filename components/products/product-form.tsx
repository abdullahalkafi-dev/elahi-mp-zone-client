"use client";
import { useRouter } from "next/navigation";
import { set, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "../ui/use-toast";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/api/features/product/productApi";
import Image from "next/image";
import { useState } from "react";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";

interface ProductFormProps {
  product?: {
    _id: string;
    name: string;
    description: string;
    image: string;
  };
}

export function ProductForm({ product }: ProductFormProps = {}) {
  console.log(product);
  const router = useRouter();
  const { toast } = useToast();

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uiImage, setUiImage] = useState<string | null>(null);
  const isSubmitting = isCreating || isUpdating;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      image: product?.image || "",
    },
  });

  if (product && !uiImage && product.image) {
    setUiImage(product.image as string);
  }

  const onSubmit = async (data: any) => {
    try {
      if (!selectedImage && !product) {
        toast({
          title: "Error",
          description: "Please select an image.",
          variant: "destructive",
        });
        return;
      }
      let image = "";
      if (selectedImage) {
        image = await uploadToCloudinary(selectedImage, "image");
      } else {
        image = product?.image || image;
      }

      if (product) {
        await updateProduct({
          id: product._id,
          body: { ...data, image },
        }).unwrap();
        toast({
          title: "Product updated",
          description: "The product has been updated successfully.",
        });


        router.push(`/dashboard/products/${product._id}`);
      } else {
        const result = await createProduct({ ...data, image }).unwrap();
        toast({
          title: "Product created",
          description: "The product has been created successfully.",
        });
        router.replace(`/dashboard/products/${result.data._id}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Product name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">
                {errors.name.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={5}
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message as string}
              </p>
            )}
          </div>
        

          {
            // Image Preview

            uiImage && product && (
              <div>
                <label className="block text-sm font-medium mb-2 text-black">
                  Current Image
                </label>

                <div className="flex items-center gap-4">
                  <div className="rounded-md bg-muted flex items-center justify-center">
                    <Image
                      src={uiImage}
                      alt={product?.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                </div>
              </div>
            )
          }

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2 text-black">
              Upload New Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="border p-2 rounded w-full text-[#00CDFE]"
              onChange={handleFileChange}
            />
            {selectedImage && (
              <div className="mt-2">
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="rounded-md border"
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : product
              ? "Update Product"
              : "Create Product"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
