import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KeyboardArrowLeftIcon } from "@/components/icons";
import { WishlistToggle } from "./_components/wishlist-toggle";
import { ProductGallery } from "./_components/product-gallery";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getProduct, productsData } from "@/lib/api/products";
import { Product } from "@/utils/interfaces";

// Generate static params for all products
export async function generateStaticParams() {
  return productsData.map((product: Product) => ({
    id: product.id,
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <ScrollReveal>
      <Container className="py-10 md:py-12">
        {/* Breadcrumb / back link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-body-4 text-(--on-bg-medium) hover:text-(--on-bg-high) transition-colors mb-6"
        >
          <KeyboardArrowLeftIcon className="size-4" />
          Back to products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div>
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-display-2 md:text-display-1 text-(--on-bg-high) mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2">
                  <p className="text-display-4 text-(--on-bg-high) font-semibold">
                    ${product.price}
                  </p>
                  {product.isNew && (
                    <Badge variant="filled-static" size="chip-small">
                      New
                    </Badge>
                  )}
                  {product.isSale && (
                    <Badge variant="destructive" size="chip-small">
                      Sale
                    </Badge>
                  )}
                </div>
              </div>
              <WishlistToggle product={product} />
            </div>

            <p className="text-body-2 text-(--on-bg-medium) leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {product.size.map((size) => (
                <Badge key={size} variant="outlined-static" size="chip-small">
                  {size}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2 text-body-4 text-(--on-bg-low)">
              <span>Color: {product.color}</span>
              <span className="w-px h-4 bg-(--outline)" />
              <span>Type: {product.type}</span>
              {product.rating && (
                <>
                  <span className="w-px h-4 bg-(--outline)" />
                  <span>
                    ★ {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="filled"
                size="large"
                className="flex-1"
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to cart" : "Out of stock"}
              </Button>
              <Button variant="outlined" size="large">
                Add to wishlist
              </Button>
            </div>

            <div className="pt-4 text-body-4 text-(--on-bg-low)">
              {product.inStock ? (
                <span>✓ In stock</span>
              ) : (
                <span>✗ Out of stock</span>
              )}
            </div>
          </div>
        </div>
      </Container>
    </ScrollReveal>
  );
}
