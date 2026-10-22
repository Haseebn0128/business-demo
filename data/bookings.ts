import type { Booking } from "@/types";

export const seedBookings: Booking[] = [
  {
    id: "b1",
    customerName: "Hamza Ali",
    phone: "0301 442 1988",
    email: "hamza@example.demo",
    productName: "The Ark Sofa",
    intent: "Showroom visit",
    preferredDate: "2026-10-19",
    preferredTime: "4:00 PM – 5:00 PM",
    notes: "Would like to compare Oat and Clay upholstery in person.",
    status: "Requested",
    createdAt: "Today, 11:40am",
  },
  {
    id: "b2",
    customerName: "Mariam Shah",
    phone: "0324 668 2940",
    productName: "Mesa Dining Table",
    intent: "Custom order consultation",
    preferredDate: "2026-10-20",
    preferredTime: "11:00 AM – 12:00 PM",
    notes: "Needs a six-seat version for a new apartment.",
    status: "Confirmed",
    createdAt: "Yesterday",
  },
];
