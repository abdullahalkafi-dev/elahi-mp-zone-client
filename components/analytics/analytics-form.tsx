"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { SalesEntry } from "@/app/dashboard/analytics/page";
import { toast } from "react-toastify";
import { useCreateAnalyticsMutation } from "@/redux/api/features/analytics/analyticsApi";

interface Product {
  _id: string;
  name: string;
  variants: Variant[];
}

interface Variant {
  _id: string;
  variant: string;
  price: number;
  stock?: number;
}

interface AnalyticsFormProps {
  products: Product[];
  onSubmit: (entry: SalesEntry) => void;
  existingData: SalesEntry[];
}

export function AnalyticsForm({
  products,
  onSubmit,
  existingData,
}: AnalyticsFormProps) {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      unitsSold: 0,
      deliveryLoss: 0,
    },
  });

  const unitsSold = watch("unitsSold");
  const deliveryLoss = watch("deliveryLoss");

  // Calculate totals
  const calculateTotals = (
    price: number,
    unitsSold: number,
    deliveryLoss: number
  ) => {
    const totalSales = price * unitsSold;
    const totalLoss = price * deliveryLoss;
    const totalRevenue = totalSales - totalLoss;

    return { totalSales, totalLoss, totalRevenue };
  };

  // When product selection changes
  useEffect(() => {
    if (selectedProduct) {
      setSelectedVariant("");
      setPrice(0);

      // Check if there's existing data for this product
      const existingEntry = existingData.find(
        (entry) => entry.productId === selectedProduct
      );
      if (existingEntry) {
        setSelectedVariant(existingEntry.variantId);
        setPrice(existingEntry.price);
        setValue("unitsSold", existingEntry.unitsSold);
        setValue("deliveryLoss", existingEntry.deliveryLoss);
        setIsEditing(true);
      } else {
        reset({ unitsSold: 0, deliveryLoss: 0 });
        setIsEditing(false);
      }
    }
  }, [selectedProduct, existingData, setValue, reset]);

  // When variant selection changes
  useEffect(() => {
    if (selectedProduct && selectedVariant) {
      const product = products.find((p) => p._id === selectedProduct);
      const variant = product?.variants.find((v) => v._id === selectedVariant);

      if (variant) {
        setPrice(variant.price);

        // Check if there's existing data for this variant
        const existingEntry = existingData.find(
          (entry) =>
            entry.productId === selectedProduct &&
            entry.variantId === selectedVariant
        );

        if (existingEntry) {
          setValue("unitsSold", existingEntry.unitsSold);
          setValue("deliveryLoss", existingEntry.deliveryLoss);
          setIsEditing(true);
        } else {
          reset({ unitsSold: 0, deliveryLoss: 0 });
          setIsEditing(false);
        }
      }
    }
  }, [
    selectedVariant,
    selectedProduct,
    products,
    existingData,
    setValue,
    reset,
  ]);
  const [createDataHandler, { isLoading }] = useCreateAnalyticsMutation();
  const onFormSubmit = (data: any) => {
    if (!selectedProduct || !selectedVariant) {
      toast.error("Please select a product and variant");
      return;
    }

    const product = products.find((p) => p._id === selectedProduct);
    const variant = product?.variants.find((v) => v._id === selectedVariant);

    if (!product || !variant) {
      toast.error("Product or variant not found");
      return;
    }

    const { totalSales, totalLoss, totalRevenue } = calculateTotals(
      price,
      Number(data.unitsSold),
      Number(data.deliveryLoss)
    );

    // Find existing entry to get its ID if we're editing
    const existingEntry = existingData.find(
      (entry) =>
        entry.productId === selectedProduct &&
        entry.variantId === selectedVariant
    );

    if (unitsSold < 0 || deliveryLoss < 0) {
      toast.error("Units sold and delivery loss must be 0 or greater");
      return;
    }
    const entry: SalesEntry = {
      id: existingEntry?.id || uuidv4(),
      productId: selectedProduct,
      productName: product.name,
      variantId: selectedVariant,
      variantName: variant.variant,
      price: price,
      unitsSold: Number(data.unitsSold),
      deliveryLoss: Number(data.deliveryLoss),
      totalSales,
      totalLoss,
      totalRevenue,
    };

    onSubmit(entry);
    createDataHandler({
      product: product.name,
      variant: variant.variant,
      singleUnitPrice: price,
      unitsSold: Number(data.unitsSold),
      deliveryLoss: Number(data.deliveryLoss),
      totalSales,
      totalLoss,
      totalRevenue,
    });

    toast.success(
      isEditing ? "Entry updated successfully" : "Entry added successfully"
    );

    // Reset form if not editing
    if (!isEditing) {
      setSelectedProduct("");
      setSelectedVariant("");
      setPrice(0);
      reset();
    }
  };

  // Preview calculations
  const { totalSales, totalLoss, totalRevenue } = calculateTotals(
    price,
    Number(unitsSold) || 0,
    Number(deliveryLoss) || 0
  );

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product">Product</Label>
              <Select
                value={selectedProduct}
                onValueChange={setSelectedProduct}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product._id} value={product._id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="variant">Variant</Label>
              <Select
                value={selectedVariant}
                onValueChange={setSelectedVariant}
                disabled={!selectedProduct}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a variant" />
                </SelectTrigger>
                <SelectContent>
                  {selectedProduct &&
                    products
                      .find((p) => p._id === selectedProduct)
                      ?.variants.map((variant) => (
                        <SelectItem key={variant._id} value={variant._id}>
                          {variant.variant} (${variant.price})
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price per unit</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unitsSold">Units Sold</Label>
              <Input
                id="unitsSold"
                type="number"
                {...register("unitsSold", {
                  required: "Units sold is required",
                  min: { value: 0, message: "Units sold must be 0 or greater" },
                })}
                disabled={!selectedVariant}
              />
              {errors.unitsSold && (
                <p className="text-sm text-destructive">
                  {errors.unitsSold.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryLoss">Delivery Loss (units)</Label>
              <Input
                id="deliveryLoss"
                type="number"
                {...register("deliveryLoss", {
                  required: "Delivery loss is required",
                  min: {
                    value: 0,
                    message: "Delivery loss must be 0 or greater",
                  },
                })}
                disabled={!selectedVariant}
              />
              {errors.deliveryLoss && (
                <p className="text-sm text-destructive">
                  {errors.deliveryLoss.message as string}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={!selectedVariant || isLoading}
            >
              {isEditing ? "Update Entry" : "Add Entry"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calculation Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Price per unit</Label>
                <p className="text-2xl font-bold">${price}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Units Sold</Label>
                <p className="text-2xl font-bold">{unitsSold || 0}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Delivery Loss</Label>
                <p className="text-2xl font-bold">{deliveryLoss || 0} units</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Loss Amount</Label>
                <p className="text-2xl font-bold text-destructive">
                  ${totalLoss}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Total Sales</Label>
                <p className="text-2xl font-bold">${totalSales}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Total Loss</Label>
                <p className="text-2xl font-bold text-destructive">
                  ${totalLoss}
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Total Revenue</Label>
                <p className="text-2xl font-bold text-primary">
                  ${totalRevenue}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
