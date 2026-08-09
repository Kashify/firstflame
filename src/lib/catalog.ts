import groundImg from "@/assets/p-ground.jpg";
import wholeImg from "@/assets/p-whole.jpg";
import blendImg from "@/assets/p-blend.jpg";
import dryfruitsImg from "@/assets/p-dryfruits.jpg";

export type CategorySlug =
  | "ground-spices"
  | "whole-spices"
  | "blended-masalas"
  | "dry-fruits";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
}

export const categories: Category[] = [
  {
    slug: "ground-spices",
    name: "Pure Ground Spices",
    tagline: "100% Natural, Rich Aroma & Pure Spice",
    image: groundImg,
  },
  {
    slug: "whole-spices",
    name: "Whole Spices",
    tagline: "Carefully Sourced & Sun-Dried",
    image: wholeImg,
  },
  {
    slug: "blended-masalas",
    name: "Blended Masalas",
    tagline: "Traditional Taste, Pehla Sa Pyar",
    image: blendImg,
  },
  {
    slug: "dry-fruits",
    name: "Dry Fruits & Nuts",
    tagline: "Premium Quality & Wholesome",
    image: dryfruitsImg,
  },
];

export const categoryImage: Record<CategorySlug, string> = {
  "ground-spices": groundImg,
  "whole-spices": wholeImg,
  "blended-masalas": blendImg,
  "dry-fruits": dryfruitsImg,
};

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  categoryName: string;
  shortDescription: string;
  description: string;
  origin: string;
  weight: string;
  weights: string[];
  mrp: number;
  price: number;
  discount: number;
  rating: number;
  reviewCount: number;
  stock: number;
  organic: boolean;
  spiceLevel: "Mild" | "Medium" | "Hot";
  shelfLife: string;
  ingredients: string[];
  usage: string[];
  nutrition: { label: string; value: string }[];
  images: string[];
  badges: string[];
  bestSeller: boolean;
  newArrival: boolean;
}

// The exact 4 products from the official FIRST FLAME product launch poster
export const products: Product[] = [
  {
    id: "FF-0001",
    slug: "dhania-powder",
    name: "DHANIA POWDER",
    category: "ground-spices",
    categoryName: "Pure Ground Spices",
    shortDescription: "Rich Aroma | Pure Spice",
    description:
      "Our Dhania Powder (Coriander) is produced from carefully sourced, high-grade coriander seeds. Stone-ground under strict hygienic standards to deliver rich aroma, pure spice, and authentic taste for everyday cooking. No artificial colours or preservatives added.",
    origin: "Kota, Rajasthan",
    weight: "80 g",
    weights: ["80 g", "200 g", "500 g"],
    mrp: 60,
    price: 50,
    discount: 17,
    rating: 4.9,
    reviewCount: 342,
    stock: 120,
    organic: true,
    spiceLevel: "Mild",
    shelfLife: "12 months from packaging",
    ingredients: ["100% Pure Coriander Seeds (Dhania)"],
    usage: [
      "Add 1 tsp to curries and gravies while sautéing onions and tomatoes.",
      "Use as a foundational aromatic in everyday vegetable dishes.",
      "Store in a cool, dry place away from direct sunlight.",
    ],
    nutrition: [
      { label: "Energy", value: "298 kcal" },
      { label: "Protein", value: "12.3 g" },
      { label: "Carbohydrate", value: "54.9 g" },
      { label: "Total Fat", value: "17.8 g" },
      { label: "Dietary Fibre", value: "41.9 g" },
    ],
    images: [groundImg, groundImg],
    badges: ["100% Natural", "Pure & Wholesome", "Traditional Taste"],
    bestSeller: true,
    newArrival: true,
  },
  {
    id: "FF-0002",
    slug: "haldi-powder",
    name: "HALDI POWDER",
    category: "ground-spices",
    categoryName: "Pure Ground Spices",
    shortDescription: "Rich Aroma | Pure Spice",
    description:
      "FIRST FLAME Haldi Powder (Turmeric) is made from selected high-curcumin turmeric roots. Milled under hygienic conditions to preserve its natural vibrant yellow color, deep aroma, and health benefits. 100% pure, natural, and free from added synthetic dyes.",
    origin: "Erode, Tamil Nadu",
    weight: "100 g",
    weights: ["100 g", "250 g", "500 g"],
    mrp: 75,
    price: 65,
    discount: 13,
    rating: 4.9,
    reviewCount: 489,
    stock: 150,
    organic: true,
    spiceLevel: "Mild",
    shelfLife: "12 months from packaging",
    ingredients: ["100% Pure Turmeric Roots (Haldi)"],
    usage: [
      "Add ½ tsp to dal, subzi, or warm milk for daily immunity.",
      "Blooming in oil at the start of cooking releases maximum curcumin value.",
      "Keep sealed in an airtight container.",
    ],
    nutrition: [
      { label: "Energy", value: "312 kcal" },
      { label: "Protein", value: "9.6 g" },
      { label: "Carbohydrate", value: "64.8 g" },
      { label: "Total Fat", value: "3.2 g" },
      { label: "Curcumin Content", value: "High Grade (3.5%+)" },
    ],
    images: [groundImg, groundImg],
    badges: ["100% Natural", "Pure & Wholesome", "No Artificial Colours"],
    bestSeller: true,
    newArrival: true,
  },
  {
    id: "FF-0003",
    slug: "red-chilli-powder",
    name: "RED CHILLI POWDER",
    category: "ground-spices",
    categoryName: "Pure Ground Spices",
    shortDescription: "Rich Aroma | Pure Spice",
    description:
      "Our Red Chilli Powder is crafted from hand-picked sun-dried red chillies to impart a brilliant natural red color, crisp heat, and full-bodied aroma. Hygienically processed with no artificial colours or preservatives.",
    origin: "Guntur, Andhra Pradesh",
    weight: "100 g",
    weights: ["100 g", "250 g", "500 g"],
    mrp: 110,
    price: 95,
    discount: 14,
    rating: 4.8,
    reviewCount: 512,
    stock: 95,
    organic: true,
    spiceLevel: "Hot",
    shelfLife: "12 months from packaging",
    ingredients: ["100% Pure Red Chillies"],
    usage: [
      "Use ½ to 1 tsp according to preferred heat level in curries and marinades.",
      "Add early in tempering for rich natural gravy color.",
      "Reseal tightly after each use.",
    ],
    nutrition: [
      { label: "Energy", value: "318 kcal" },
      { label: "Protein", value: "12.0 g" },
      { label: "Carbohydrate", value: "56.6 g" },
      { label: "Total Fat", value: "6.2 g" },
      { label: "Vitamin C", value: "Rich Source" },
    ],
    images: [groundImg, groundImg],
    badges: ["100% Natural", "Pure & Wholesome", "No Preservatives"],
    bestSeller: true,
    newArrival: true,
  },
  {
    id: "FF-0004",
    slug: "black-pepper-powder",
    name: "BLACK PEPPER POWDER",
    category: "ground-spices",
    categoryName: "Pure Ground Spices",
    shortDescription: "Rich Aroma | Pure Spice",
    description:
      "FIRST FLAME Black Pepper Powder is ground from plump, essential-oil-rich Malabar peppercorns. Delivers sharp, penetrating heat and deep warm fragrance to elevate soups, eggs, grills, and authentic Indian dishes.",
    origin: "Idukki, Kerala",
    weight: "100 g",
    weights: ["100 g", "250 g", "500 g"],
    mrp: 210,
    price: 180,
    discount: 14,
    rating: 4.9,
    reviewCount: 278,
    stock: 80,
    organic: true,
    spiceLevel: "Medium",
    shelfLife: "12 months from packaging",
    ingredients: ["100% Pure Black Peppercorns"],
    usage: [
      "Sprinkle fresh over finished dishes, gravies, fried eggs, or salads.",
      "Add to rasam, chai, or soups for a warming digestive kick.",
      "Store away from heat and dampness.",
    ],
    nutrition: [
      { label: "Energy", value: "255 kcal" },
      { label: "Protein", value: "10.4 g" },
      { label: "Carbohydrate", value: "64.0 g" },
      { label: "Total Fat", value: "3.3 g" },
      { label: "Piperine Value", value: "High Grade" },
    ],
    images: [groundImg, groundImg],
    badges: ["100% Natural", "Pure & Wholesome", "Fresh & Aromatic"],
    bestSeller: true,
    newArrival: true,
  },
];

export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const productsByCategory = (slug: CategorySlug): Product[] => {
  const filtered = products.filter((p) => p.category === slug);
  return filtered.length > 0 ? filtered : products;
};

export const bestSellers = products;
export const newArrivals = products;

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.origin.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q),
  );
}

export function relatedProducts(product: Product, count = 4): Product[] {
  return products.filter((p) => p.slug !== product.slug).slice(0, count);
}

export const priceBounds = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
};
