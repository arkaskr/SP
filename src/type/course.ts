export interface Course {
  id: string;
  title: string;
  subtitle: string;
  thumbnailUrl: string;
  description: string;
  price: number;
  instructor: string;
  rating: number;
  reviewCount: number;
  bestseller: boolean;
  discount: number;
  level: "BASIC" | "STANDARD" | "PREMIUM";
  examCategories: { id: string; name: string }[];
  exams: { id: string; title: string }[];
  enrollmentCount: number;
}