export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderItem {
  productId: string;
  variantId?: string;
  name: string;
  image?: string;
  price: number;
  currency: string;
  quantity: number;
  color?: string;
  size?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

export interface OrderTimelineEntry {
  status: OrderStatus;
  at: string;
  note?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string | null;
  guestEmail?: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: string;
  shippingCost: number;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  payment: {
    provider: "stripe" | "cod";
    status: "pending" | "paid" | "failed" | "refunded";
    transactionId?: string;
  };
  status: OrderStatus;
  timeline: OrderTimelineEntry[];
  createdAt: string;
  updatedAt: string;
}
