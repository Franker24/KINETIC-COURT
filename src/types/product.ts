export interface Product {
  id: string;
  name: string;
  price: string;
  colors: string;
  image: string;
  secondaryImage: string;
  category: string;
  team?: string;
  brand?: string;
  description: string;
  sizes: string[];
  collection: string;
  material: string;
  featured?: boolean;
  exclusive?: boolean;
}
