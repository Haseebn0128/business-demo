export type Category = string;

export type Dimensions = {
  width: number;
  depth: number;
  height: number;
  unit: "cm";
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  description: string;
  images: string[];
  dimensions: Dimensions;
  materials: string;
  finishes: string[];
  price?: number;
  featured: boolean;
};

export type InquiryStatus = "New" | "Contacted" | "Follow-up" | "Closed";

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
};

export type BookingIntent = "Showroom visit" | "Hold if available" | "Custom order consultation";
export type BookingStatus = "Requested" | "Reviewing" | "Confirmed" | "Needs follow-up" | "Declined" | "Expired";

export type Booking = {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  productName: string;
  intent: BookingIntent;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  status: BookingStatus;
  createdAt: string;
};
