import productsData from '@/app/products/data.json';
import { Product } from '@/utils/interfaces';

export interface ProductsResponse {
  items: Product[];
  paginate: {
    page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`/products`);
  const data: ProductsResponse = await res.json();
  return data.items;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const res = await fetch(`/products/${id}`);
  return await res.json();
}

export { productsData };
