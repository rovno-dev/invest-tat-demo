"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/container";
import { ProductGrid } from "./_components/product-grid";
import { SortSelect } from "./_components/sort-select";
import { FilterDrawer } from "./_components/filter-drawer";
import { products } from "./_data";

export default function ProductsPage() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "popularity">("popularity");

  const resetFilters = () => {
    setPriceRange([0, 50]);
    setSelectedColors([]);
    setSelectedTypes([]);
    setSelectedSizes([]);
    setSortBy("popularity");
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedColors.length > 0) {
      result = result.filter((p) => selectedColors.includes(p.color));
    }

    if (selectedTypes.length > 0) {
      result = result.filter((p) => selectedTypes.includes(p.type));
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.size.some((s) => selectedSizes.includes(s))
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popularity") {
      result.sort((a, b) => b.popularity - a.popularity);
    }

    return result;
  }, [priceRange, selectedColors, selectedTypes, selectedSizes, sortBy]);

  return (
    <Container className="py-10 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-display-3 md:text-display-2 text-(--on-bg-high)">
          All Products
        </h1>
        <div className="flex items-center gap-2 flex-wrap">
          <SortSelect value={sortBy} onChange={setSortBy} />
          <FilterDrawer
            products={products}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
            onReset={resetFilters}
          />
        </div>
      </div>

      <p className="text-body-4 text-(--on-bg-medium) mb-6">
        {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
      </p>

      <ProductGrid products={filteredProducts} />
    </Container>
  );
}
