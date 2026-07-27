export type Cuisine =
  | "Indian"
  | "Italian"
  | "Mexican"
  | "Korean"
  | "Vietnamese"
  | "Japanese"
  | "American"
  | "French"
  | "Nigerian"
  | "Mediterranean"
  | "Thai"
  | "Chinese"
  | "Ethiopian"
  | "Filipino"
  | "Greek";

export type DietaryTag = "vegetarian" | "vegan" | "gluten-free";

export interface VerificationBadges {
  governmentId: boolean;
  foodHandlerCertified: boolean;
  kitchenVerified: boolean;
  phoneVerified: boolean;
  emailVerified: boolean;
  backgroundCheck: boolean;
  neighborhoodTrusted: boolean;
}

export interface Cook {
  id: string;
  slug: string;
  name: string;
  avatarColor: string;
  cuisines: Cuisine[];
  tagline: string;
  bio: string;
  story: string;
  yearsCooking: number;
  favoriteDish: string;
  responseRate: number;
  responseTime: string;
  repeatCustomerPct: number;
  mealsSold: number;
  languages: string[];
  rating: number;
  reviewCount: number;
  distanceMiles: number;
  neighborhood: string;
  city: string;
  verification: VerificationBadges;
  joinedLabel: string;
  isNewCook: boolean;
  isTrending: boolean;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  id: string;
  cookId: string;
  name: string;
  cuisine: Cuisine;
  shortDescription: string;
  description: string;
  story?: string;
  price: number;
  rating: number;
  reviewCount: number;
  portionsRemaining: number;
  totalPortions: number;
  pickupWindow: string;
  pickupDay: "Today" | "Tomorrow";
  ingredients: string[];
  allergens: string[];
  dietary: DietaryTag[];
  nutrition: NutritionInfo;
  tags: string[];
  colorTheme: CuisineTheme;
  icon: string;
}

export type CuisineTheme =
  | "saffron"
  | "tomato"
  | "lime"
  | "chili"
  | "matcha"
  | "plum"
  | "butter"
  | "cocoa"
  | "citrus"
  | "berry";

export interface Review {
  id: string;
  cookId: string;
  mealId: string;
  authorName: string;
  authorInitials: string;
  rating: number;
  text: string;
  date: string;
  hasPhoto: boolean;
}

export interface Testimonial {
  id: string;
  authorName: string;
  role: string;
  quote: string;
  rating: number;
}

export interface CuisineInfo {
  name: Cuisine;
  icon: string;
  mealCount: number;
}
