import groundImg from "@/assets/p-ground.jpg";
import wholeImg from "@/assets/p-whole.jpg";
import blendImg from "@/assets/p-blend.jpg";
import herbsImg from "@/assets/p-herbs.jpg";
import dryfruitsImg from "@/assets/p-dryfruits.jpg";
import seasoningImg from "@/assets/p-seasoning.jpg";
import giftImg from "@/assets/p-gift.jpg";

export type CategorySlug =
  | "ground-spices"
  | "whole-spices"
  | "blended-masalas"
  | "herbs"
  | "dry-fruits"
  | "seasonings"
  | "gift-boxes";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
}

export const categories: Category[] = [
  {
    slug: "ground-spices",
    name: "Ground Spices",
    tagline: "Stone-ground, single origin",
    image: groundImg,
  },
  {
    slug: "whole-spices",
    name: "Whole Spices",
    tagline: "Hand-sorted, sun-dried",
    image: wholeImg,
  },
  {
    slug: "blended-masalas",
    name: "Blended Masalas",
    tagline: "Recipes from four generations",
    image: blendImg,
  },
  { slug: "herbs", name: "Herbs & Leaves", tagline: "Aromatic and shade-dried", image: herbsImg },
  {
    slug: "dry-fruits",
    name: "Dry Fruits & Nuts",
    tagline: "Premium grade, small batch",
    image: dryfruitsImg,
  },
  {
    slug: "seasonings",
    name: "Seasonings & Salts",
    tagline: "Everyday kitchen essentials",
    image: seasoningImg,
  },
  {
    slug: "gift-boxes",
    name: "Gift & Festival Boxes",
    tagline: "Curated, beautifully packed",
    image: giftImg,
  },
];

export const categoryImage: Record<CategorySlug, string> = {
  "ground-spices": groundImg,
  "whole-spices": wholeImg,
  "blended-masalas": blendImg,
  herbs: herbsImg,
  "dry-fruits": dryfruitsImg,
  seasonings: seasoningImg,
  "gift-boxes": giftImg,
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

interface Seed {
  name: string;
  category: CategorySlug;
  origin: string;
  base: number;
  level?: "Mild" | "Medium" | "Hot";
  note: string;
}

const seeds: Seed[] = [
  // Ground spices & Core Masale Range
  { name: "Haldi Powder (Turmeric)", category: "ground-spices", origin: "Erode, Tamil Nadu", base: 65, note: "rich aroma, 100% pure haldi" },
  { name: "Red Chilli Powder", category: "ground-spices", origin: "Guntur, Andhra Pradesh", base: 95, level: "Hot", note: "rich aroma, pure spice" },
  { name: "Dhania Powder (Coriander)", category: "ground-spices", origin: "Kota, Rajasthan", base: 50, note: "fresh & aromatic pure coriander" },
  { name: "Black Pepper Powder", category: "ground-spices", origin: "Idukki, Kerala", base: 180, level: "Medium", note: "pungent Malabar black pepper" },
  { name: "Wild Turmeric Powder", category: "ground-spices", origin: "Erode, Tamil Nadu", base: 180, note: "high curcumin, deep ochre colour" },
  { name: "Kashmiri Red Chilli Powder", category: "ground-spices", origin: "Kashmir Valley", base: 260, level: "Mild", note: "brilliant colour with gentle heat" },
  { name: "Dry Ginger Powder", category: "ground-spices", origin: "Kochi, Kerala", base: 210, note: "warming and resinous" },
  { name: "Fennel Powder", category: "ground-spices", origin: "Nagaur, Rajasthan", base: 190, note: "sweet anise finish" },
  { name: "Fenugreek Powder", category: "ground-spices", origin: "Nagaur, Rajasthan", base: 140, note: "bittersweet depth" },
  { name: "Mango Powder (Amchur)", category: "ground-spices", origin: "Chhindwara, Madhya Pradesh", base: 200, note: "bright natural sourness" },
  { name: "Ground Cinnamon", category: "ground-spices", origin: "Thekkady, Kerala", base: 320, note: "true cassia, warm and sweet" },
  { name: "Ground Cardamom", category: "ground-spices", origin: "Idukki, Kerala", base: 620, note: "intensely floral" },
  { name: "Ground Cloves", category: "ground-spices", origin: "Kanyakumari, Tamil Nadu", base: 420, note: "sweet and medicinal" },
  { name: "Ground Nutmeg", category: "ground-spices", origin: "Kollam, Kerala", base: 460, note: "creamy and warm" },
  { name: "Ground Mace (Javitri)", category: "ground-spices", origin: "Kollam, Kerala", base: 540, note: "delicate and aromatic" },
  { name: "White Pepper Powder", category: "ground-spices", origin: "Wayanad, Kerala", base: 400, level: "Medium", note: "clean, sharp heat" },
  { name: "Asafoetida (Hing) Powder", category: "ground-spices", origin: "Hoshiarpur, Punjab", base: 280, note: "compounded, kitchen strength" },
  { name: "Ajwain Powder", category: "ground-spices", origin: "Ratlam, Madhya Pradesh", base: 170, note: "thyme-like and bracing" },
  { name: "Mustard Powder", category: "ground-spices", origin: "Alwar, Rajasthan", base: 130, level: "Medium", note: "pungent yellow mustard" },
  { name: "Poppy Seed Powder", category: "ground-spices", origin: "Barwani, Madhya Pradesh", base: 520, note: "nutty thickening spice" },
  { name: "Star Anise Powder", category: "ground-spices", origin: "Meghalaya Hills", base: 480, note: "liquorice sweetness" },
  { name: "Bay Leaf Powder", category: "ground-spices", origin: "Uttarakhand", base: 160, note: "gentle woody perfume" },

  // Whole spices
  { name: "Whole Black Peppercorns", category: "whole-spices", origin: "Idukki, Kerala", base: 420, level: "Medium", note: "bold Tellicherry grade" },
  { name: "Green Cardamom Pods", category: "whole-spices", origin: "Idukki, Kerala", base: 760, note: "8mm bold pods" },
  { name: "Black Cardamom", category: "whole-spices", origin: "Sikkim", base: 520, note: "smoky and resinous" },
  { name: "Cinnamon Sticks", category: "whole-spices", origin: "Thekkady, Kerala", base: 340, note: "hand-rolled quills" },
  { name: "Whole Cloves", category: "whole-spices", origin: "Kanyakumari, Tamil Nadu", base: 450, note: "plump, oil-rich buds" },
  { name: "Cumin Seeds", category: "whole-spices", origin: "Unjha, Gujarat", base: 230, note: "double-cleaned" },
  { name: "Coriander Seeds", category: "whole-spices", origin: "Kota, Rajasthan", base: 140, note: "Eagle variety" },
  { name: "Mustard Seeds", category: "whole-spices", origin: "Alwar, Rajasthan", base: 110, level: "Medium", note: "small black rai" },
  { name: "Fenugreek Seeds", category: "whole-spices", origin: "Nagaur, Rajasthan", base: 120, note: "golden and bitter" },
  { name: "Fennel Seeds", category: "whole-spices", origin: "Nagaur, Rajasthan", base: 200, note: "lucknowi fine grade" },
  { name: "Carom Seeds (Ajwain)", category: "whole-spices", origin: "Ratlam, Madhya Pradesh", base: 180, note: "sharp and digestive" },
  { name: "Nigella Seeds (Kalonji)", category: "whole-spices", origin: "Neemuch, Madhya Pradesh", base: 190, note: "peppery and toasty" },
  { name: "Whole Dried Red Chillies", category: "whole-spices", origin: "Byadgi, Karnataka", base: 260, level: "Mild", note: "wrinkled, colour-rich" },
  { name: "Star Anise Whole", category: "whole-spices", origin: "Meghalaya Hills", base: 520, note: "perfect eight-point stars" },
  { name: "Whole Nutmeg", category: "whole-spices", origin: "Kollam, Kerala", base: 580, note: "dense and oily" },
  { name: "Mace Flower (Javitri)", category: "whole-spices", origin: "Kollam, Kerala", base: 640, note: "crimson lace blades" },
  { name: "Bay Leaves (Tej Patta)", category: "whole-spices", origin: "Uttarakhand", base: 130, note: "long, unbroken leaves" },
  { name: "Stone Flower (Dagad Phool)", category: "whole-spices", origin: "Western Ghats", base: 360, note: "earthy Kolhapuri essential" },
  { name: "Saffron Threads", category: "whole-spices", origin: "Pampore, Kashmir", base: 2450, note: "Mongra grade, hand-picked" },
  { name: "Long Pepper (Pippali)", category: "whole-spices", origin: "Assam", base: 480, level: "Medium", note: "sweet lingering heat" },
  { name: "Dried Ginger Whole", category: "whole-spices", origin: "Kochi, Kerala", base: 260, note: "sun-dried sonth" },
  { name: "Kokum Rinds", category: "whole-spices", origin: "Konkan Coast", base: 240, note: "tart coastal souring agent" },

  // Blended masalas
  { name: "Royal Garam Masala", category: "blended-masalas", origin: "House Blend, Jaipur", base: 320, level: "Medium", note: "sixteen spices, slow roasted" },
  { name: "Kitchen King Masala", category: "blended-masalas", origin: "House Blend, Jaipur", base: 280, level: "Medium", note: "the everyday all-rounder" },
  { name: "Chole Masala", category: "blended-masalas", origin: "House Blend, Amritsar", base: 240, level: "Medium", note: "dark, tangy Punjabi style" },
  { name: "Chicken Masala", category: "blended-masalas", origin: "House Blend, Jaipur", base: 300, level: "Hot", note: "deep colour, full body" },
  { name: "Mutton Masala", category: "blended-masalas", origin: "House Blend, Lucknow", base: 340, level: "Hot", note: "rich and slow-cook ready" },
  { name: "Hyderabadi Biryani Masala", category: "blended-masalas", origin: "House Blend, Hyderabad", base: 360, level: "Medium", note: "dum-style aromatics" },
  { name: "Pav Bhaji Masala", category: "blended-masalas", origin: "House Blend, Mumbai", base: 220, level: "Medium", note: "buttery street-style" },
  { name: "Sabzi Masala", category: "blended-masalas", origin: "House Blend, Jaipur", base: 210, level: "Mild", note: "for everyday vegetables" },
  { name: "Chaat Masala", category: "blended-masalas", origin: "House Blend, Delhi", base: 190, level: "Mild", note: "black salt and amchur" },
  { name: "Sambar Masala", category: "blended-masalas", origin: "House Blend, Chennai", base: 230, level: "Medium", note: "roasted dal and chilli" },
  { name: "Rasam Powder", category: "blended-masalas", origin: "House Blend, Madurai", base: 220, level: "Medium", note: "pepper-forward" },
  { name: "Kadai Masala", category: "blended-masalas", origin: "House Blend, Amritsar", base: 260, level: "Hot", note: "coarse crushed coriander" },
  { name: "Tandoori Masala", category: "blended-masalas", origin: "House Blend, Amritsar", base: 280, level: "Hot", note: "smoky, marinade ready" },
  { name: "Butter Chicken Masala", category: "blended-masalas", origin: "House Blend, Delhi", base: 300, level: "Mild", note: "creamy tomato profile" },
  { name: "Paneer Tikka Masala", category: "blended-masalas", origin: "House Blend, Delhi", base: 270, level: "Medium", note: "char-grill spice" },
  { name: "Rajma Masala", category: "blended-masalas", origin: "House Blend, Jammu", base: 230, level: "Medium", note: "hearty and warming" },
  { name: "Dal Tadka Masala", category: "blended-masalas", origin: "House Blend, Patna", base: 200, level: "Mild", note: "tempering blend" },
  { name: "Kolhapuri Masala", category: "blended-masalas", origin: "House Blend, Kolhapur", base: 290, level: "Hot", note: "fiery Maharashtrian" },
  { name: "Goda Masala", category: "blended-masalas", origin: "House Blend, Pune", base: 250, level: "Mild", note: "coconut and sesame sweetness" },
  { name: "Malvani Masala", category: "blended-masalas", origin: "House Blend, Malvan", base: 285, level: "Hot", note: "coastal chilli blend" },
  { name: "Fish Curry Masala", category: "blended-masalas", origin: "House Blend, Kochi", base: 265, level: "Medium", note: "tamarind friendly" },
  { name: "Egg Curry Masala", category: "blended-masalas", origin: "House Blend, Kolkata", base: 215, level: "Medium", note: "bengali style" },
  { name: "Achari Masala", category: "blended-masalas", origin: "House Blend, Amritsar", base: 245, level: "Hot", note: "pickling spice mix" },
  { name: "Shahi Korma Masala", category: "blended-masalas", origin: "House Blend, Lucknow", base: 380, level: "Mild", note: "nut and saffron rich" },
  { name: "Punjabi Chana Masala", category: "blended-masalas", origin: "House Blend, Amritsar", base: 235, level: "Medium", note: "anardana finish" },
  { name: "Meat Tenderising Masala", category: "blended-masalas", origin: "House Blend, Lucknow", base: 310, level: "Medium", note: "raw papaya and spice" },

  // Herbs
  { name: "Kasuri Methi Leaves", category: "herbs", origin: "Nagaur, Rajasthan", base: 190, note: "shade-dried, intensely fragrant" },
  { name: "Dried Mint Leaves", category: "herbs", origin: "Nashik, Maharashtra", base: 160, note: "cool and clean" },
  { name: "Dried Curry Leaves", category: "herbs", origin: "Coimbatore, Tamil Nadu", base: 150, note: "south Indian tempering staple" },
  { name: "Dried Coriander Leaves", category: "herbs", origin: "Nashik, Maharashtra", base: 140, note: "bright garnish herb" },
  { name: "Dried Rose Petals", category: "herbs", origin: "Pushkar, Rajasthan", base: 320, note: "for desserts and thandai" },
  { name: "Dried Lemongrass", category: "herbs", origin: "Meghalaya", base: 210, note: "citrus infusion herb" },
  { name: "Dried Tulsi Leaves", category: "herbs", origin: "Vrindavan, Uttar Pradesh", base: 230, note: "holy basil, for teas" },
  { name: "Dried Oregano", category: "herbs", origin: "Nilgiris, Tamil Nadu", base: 180, note: "peppery and floral" },
  { name: "Dried Thyme", category: "herbs", origin: "Nilgiris, Tamil Nadu", base: 220, note: "earthy and fine" },
  { name: "Dried Basil", category: "herbs", origin: "Nilgiris, Tamil Nadu", base: 200, note: "sweet italian basil" },
  { name: "Dried Rosemary", category: "herbs", origin: "Nilgiris, Tamil Nadu", base: 240, note: "resinous needles" },
  { name: "Dried Bay & Herb Bouquet", category: "herbs", origin: "House Blend, Uttarakhand", base: 260, note: "slow-cook aromatics" },

  // Dry fruits
  { name: "Mamra Almonds", category: "dry-fruits", origin: "Kashmir Valley", base: 1450, note: "sweet, oil-rich kernels" },
  { name: "Kashmiri Walnut Kernels", category: "dry-fruits", origin: "Kashmir Valley", base: 1180, note: "light halves, low bitterness" },
  { name: "W240 Cashew Nuts", category: "dry-fruits", origin: "Panruti, Tamil Nadu", base: 980, note: "large, ivory white" },
  { name: "Iranian Pistachios", category: "dry-fruits", origin: "Imported, packed in India", base: 1350, note: "roasted and lightly salted" },
  { name: "Black Raisins", category: "dry-fruits", origin: "Sangli, Maharashtra", base: 420, note: "seedless and plump" },
  { name: "Golden Raisins", category: "dry-fruits", origin: "Sangli, Maharashtra", base: 460, note: "long green variety" },
  { name: "Medjool Dates", category: "dry-fruits", origin: "Imported, packed in India", base: 890, note: "soft caramel flesh" },
  { name: "Dried Figs (Anjeer)", category: "dry-fruits", origin: "Purandar, Maharashtra", base: 940, note: "sun-dried, honeyed" },
  { name: "Apricots (Khubani)", category: "dry-fruits", origin: "Ladakh", base: 780, note: "sun-dried, unsulphured" },
  { name: "Charoli Seeds (Chironji)", category: "dry-fruits", origin: "Bastar, Chhattisgarh", base: 1250, note: "for kheer and korma" },
  { name: "Melon Seeds (Magaz)", category: "dry-fruits", origin: "Bundelkhand", base: 560, note: "gravy thickener" },
  { name: "Premium Trail Mix", category: "dry-fruits", origin: "House Blend", base: 720, note: "five-nut everyday mix" },

  // Seasonings
  { name: "Himalayan Pink Salt", category: "seasonings", origin: "Himalayan Range", base: 190, note: "coarse crystal" },
  { name: "Black Salt (Kala Namak)", category: "seasonings", origin: "Rajasthan", base: 150, note: "sulphurous and tangy" },
  { name: "Rock Salt (Sendha Namak)", category: "seasonings", origin: "Rajasthan", base: 140, note: "fasting-friendly" },
  { name: "Peri Peri Seasoning", category: "seasonings", origin: "House Blend", base: 230, level: "Hot", note: "for fries and grills" },
  { name: "Tandoori Sprinkle", category: "seasonings", origin: "House Blend", base: 220, level: "Medium", note: "finishing dust" },
  { name: "Garlic Powder", category: "seasonings", origin: "Rajgarh, Madhya Pradesh", base: 260, note: "no anti-caking agents" },
  { name: "Onion Powder", category: "seasonings", origin: "Nashik, Maharashtra", base: 240, note: "sweet white onion" },
  { name: "Lemon Pepper Seasoning", category: "seasonings", origin: "House Blend", base: 250, level: "Medium", note: "zesty and sharp" },
  { name: "Pizza Seasoning", category: "seasonings", origin: "House Blend", base: 200, level: "Mild", note: "herb-forward" },
  { name: "Sandwich Masala", category: "seasonings", origin: "House Blend, Mumbai", base: 180, level: "Mild", note: "street-cart classic" },

  // Gift boxes
  { name: "Heritage Spice Trunk", category: "gift-boxes", origin: "Curated in Jaipur", base: 3450, note: "twelve signature spices in glass" },
  { name: "Diwali Festival Box", category: "gift-boxes", origin: "Curated in Jaipur", base: 2450, note: "masalas, dry fruits and saffron" },
  { name: "Chef's Signature Six", category: "gift-boxes", origin: "Curated in Jaipur", base: 1850, note: "six blends for the pro kitchen" },
  { name: "Saffron & Cardamom Duo", category: "gift-boxes", origin: "Curated in Jaipur", base: 2950, note: "our two most precious spices" },
  { name: "Everyday Essentials Kit", category: "gift-boxes", origin: "Curated in Jaipur", base: 1250, note: "eight kitchen staples" },
  { name: "Corporate Gifting Case", category: "gift-boxes", origin: "Curated in Jaipur", base: 4250, note: "customisable premium case" },
];

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const weightsByCategory: Record<CategorySlug, string[]> = {
  "ground-spices": ["100 g", "200 g", "500 g"],
  "whole-spices": ["100 g", "250 g", "500 g"],
  "blended-masalas": ["50 g", "100 g", "200 g"],
  herbs: ["25 g", "50 g", "100 g"],
  "dry-fruits": ["250 g", "500 g", "1 kg"],
  seasonings: ["100 g", "200 g"],
  "gift-boxes": ["1 box"],
};

const nutritionByCategory: Record<CategorySlug, { label: string; value: string }[]> = {
  "ground-spices": [
    { label: "Energy", value: "312 kcal" },
    { label: "Protein", value: "9.2 g" },
    { label: "Carbohydrate", value: "58.4 g" },
    { label: "Total Fat", value: "6.1 g" },
    { label: "Dietary Fibre", value: "21.3 g" },
    { label: "Sodium", value: "38 mg" },
  ],
  "whole-spices": [
    { label: "Energy", value: "334 kcal" },
    { label: "Protein", value: "11.4 g" },
    { label: "Carbohydrate", value: "54.2 g" },
    { label: "Total Fat", value: "8.9 g" },
    { label: "Dietary Fibre", value: "24.8 g" },
    { label: "Sodium", value: "26 mg" },
  ],
  "blended-masalas": [
    { label: "Energy", value: "348 kcal" },
    { label: "Protein", value: "12.1 g" },
    { label: "Carbohydrate", value: "49.6 g" },
    { label: "Total Fat", value: "11.7 g" },
    { label: "Dietary Fibre", value: "18.9 g" },
    { label: "Sodium", value: "410 mg" },
  ],
  herbs: [
    { label: "Energy", value: "268 kcal" },
    { label: "Protein", value: "14.6 g" },
    { label: "Carbohydrate", value: "42.1 g" },
    { label: "Total Fat", value: "4.2 g" },
    { label: "Dietary Fibre", value: "28.4 g" },
    { label: "Sodium", value: "62 mg" },
  ],
  "dry-fruits": [
    { label: "Energy", value: "586 kcal" },
    { label: "Protein", value: "20.4 g" },
    { label: "Carbohydrate", value: "21.7 g" },
    { label: "Total Fat", value: "49.2 g" },
    { label: "Dietary Fibre", value: "12.1 g" },
    { label: "Sodium", value: "4 mg" },
  ],
  seasonings: [
    { label: "Energy", value: "212 kcal" },
    { label: "Protein", value: "7.8 g" },
    { label: "Carbohydrate", value: "38.4 g" },
    { label: "Total Fat", value: "3.6 g" },
    { label: "Dietary Fibre", value: "9.4 g" },
    { label: "Sodium", value: "1240 mg" },
  ],
  "gift-boxes": [
    { label: "Contents", value: "Assorted" },
    { label: "Net Weight", value: "Varies by jar" },
    { label: "Storage", value: "Cool, dry place" },
    { label: "Allergens", value: "May contain nuts" },
  ],
};

const usageByCategory: Record<CategorySlug, string[]> = {
  "ground-spices": [
    "Add to hot oil with onions to bloom the aroma before adding tomatoes.",
    "Use ½ teaspoon per serving and adjust to taste.",
    "Store in an airtight jar away from direct sunlight.",
  ],
  "whole-spices": [
    "Dry roast on low heat for 30 seconds to release essential oils.",
    "Temper in ghee at the start of the dish, or grind fresh as needed.",
    "Keep whole until use — ground spice loses aroma within weeks.",
  ],
  "blended-masalas": [
    "Add in the final third of cooking so the aromatics stay bright.",
    "Use 1 teaspoon per 250 g of vegetables, paneer or meat.",
    "Finish with a knob of ghee to round out the blend.",
  ],
  herbs: [
    "Crush between your palms before adding to release the oils.",
    "Add off the heat to preserve the fragrance.",
    "A pinch is enough — these leaves are concentrated.",
  ],
  "dry-fruits": [
    "Enjoy as-is, or soak overnight for a softer bite.",
    "Roast lightly in ghee for sweets and pulaos.",
    "Refrigerate after opening to keep the oils fresh.",
  ],
  seasonings: [
    "Sprinkle over the finished dish just before serving.",
    "Excellent on fries, grilled vegetables, eggs and salads.",
    "Reseal tightly — the blend absorbs moisture quickly.",
  ],
  "gift-boxes": [
    "Presented in a rigid magnetic-close box with gold foiling.",
    "Add a personalised note at checkout.",
    "Ships in protective outer packaging across India.",
  ],
};

const ingredientsFor = (seed: Seed): string[] => {
  if (seed.category === "blended-masalas") {
    return [
      "Coriander",
      "Cumin",
      "Red Chilli",
      "Turmeric",
      "Black Pepper",
      "Cinnamon",
      "Clove",
      "Green Cardamom",
      "Bay Leaf",
      "Salt",
    ];
  }
  if (seed.category === "gift-boxes") return ["Assorted spices and blends", "No added colour", "No preservatives"];
  if (seed.category === "seasonings") return [seed.name.replace(/ (Seasoning|Powder|Salt|Masala|Sprinkle)$/, ""), "Sea Salt", "Herbs", "Spices"];
  return [`100% ${seed.name.replace(/ (Powder|Seeds|Leaves|Whole|Kernels|Pods|Sticks|Threads|Rinds)$/, "")}`];
};

function buildProduct(seed: Seed, index: number): Product {
  const slug = slugify(seed.name);
  const h = hash(slug);
  const discount = 8 + (h % 5) * 5; // 8–28%
  const mrp = seed.base;
  const price = Math.round((mrp * (100 - discount)) / 100 / 5) * 5;
  const rating = Number((4.1 + ((h >> 3) % 9) / 10).toFixed(1));
  const reviewCount = 24 + ((h >> 5) % 780);
  const stock = (h >> 7) % 11 === 0 ? 0 : 6 + ((h >> 9) % 140);
  const weights = weightsByCategory[seed.category];
  const organic = h % 3 === 0;
  const level = seed.level ?? "Mild";

  const badges: string[] = ["100% Natural"];
  if (organic) badges.push("Organic");
  if (seed.category === "blended-masalas") badges.push("House Blend");
  if (seed.origin.includes("Kashmir")) badges.push("Single Origin");
  if (h % 2 === 0) badges.push("Hygienically Processed");

  return {
    id: `FFS-${String(index + 1).padStart(4, "0")}`,
    slug,
    name: seed.name,
    category: seed.category,
    categoryName: categories.find((c) => c.slug === seed.category)!.name,
    shortDescription: `${seed.note.charAt(0).toUpperCase()}${seed.note.slice(1)}.`,
    description: `Our ${seed.name} comes from ${seed.origin}, where we buy directly from growers we have worked with for years. Every lot is cleaned, sorted and processed in small batches, then packed within days of milling so the volatile oils — and the ${seed.note} that defines it — reach your kitchen intact. No fillers, no artificial colour, no anti-caking agents. Ever.`,
    origin: seed.origin,
    weight: weights[0]!,
    weights,
    mrp,
    price,
    discount,
    rating,
    reviewCount,
    stock,
    organic,
    spiceLevel: level,
    shelfLife: seed.category === "dry-fruits" ? "9 months from packaging" : "12 months from packaging",
    ingredients: ingredientsFor(seed),
    usage: usageByCategory[seed.category],
    nutrition: nutritionByCategory[seed.category],
    images: [categoryImage[seed.category], categoryImage[seed.category]],
    badges,
    bestSeller: h % 7 === 0,
    newArrival: h % 11 === 0,
  };
}

export const products: Product[] = seeds.map(buildProduct);

export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const productsByCategory = (slug: CategorySlug): Product[] =>
  products.filter((p) => p.category === slug);

export const bestSellers = products.filter((p) => p.bestSeller).slice(0, 8);
export const newArrivals = products.filter((p) => p.newArrival).slice(0, 8);

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q),
    )
    .slice(0, 40);
}

export function relatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, count);
}

export const priceBounds = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
};
