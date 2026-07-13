import productsData from '@/app/products/data.json';
import { Product } from '@/utils/interfaces';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getProducts(): Promise<Product[]> {
  if (!API_BASE) {
    // If no API URL configured, fallback to local JSON
    return productsData as Product[];
  }
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch {
    return productsData as Product[];
  }
}

export async function getProduct(id: string): Promise<Product | undefined> {
  if (!API_BASE) {
    return productsData.find(p => p.id === id) as Product | undefined;
  }
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return await res.json();
  } catch {
    return productsData.find(p => p.id === id) as Product | undefined;
  }
}

// For static generation
export { productsData };
