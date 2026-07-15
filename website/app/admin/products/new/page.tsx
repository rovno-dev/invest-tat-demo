"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  return (
    <Container className="py-10 md:py-12 max-w-2xl">
      <h1 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-6">
        Add New Product
      </h1>
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" placeholder="Enter product name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input id="price" type="number" step="0.01" placeholder="0.00" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            className="w-full min-h-32 rounded-lg border border-border bg-background p-3"
            placeholder="Enter product description"
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit" variant="filled" size="medium">Save Product</Button>
          <Button type="button" variant="outlined" size="medium" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </Container>
  );
}
