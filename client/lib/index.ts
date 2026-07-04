// client/types/index.ts

export interface ServicePackage {
  id: string;

  name: string;

  slug: string;

  description: string;

  price: number;

  features: string[];

  popular?: boolean;
}

export interface Testimonial {
  id: string;

  name: string;

  company: string;

  review: string;

  rating: number;

  avatar: string;
}

export interface User {
  id: string;

  name: string;

  email: string;

  role: "client" | "admin";
}