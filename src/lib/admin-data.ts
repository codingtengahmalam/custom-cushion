import { CUSHION_SHAPES, CUSHION_COLORS, CUSHION_MATERIALS } from "@/lib/cushion-data";

export type OrderStatus =
  | "waiting_payment"
  | "payment_confirmed"
  | "in_production"
  | "shipped"
  | "delivered"
  | "cancelled";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  waiting_payment: "Menunggu Pembayaran",
  payment_confirmed: "Pembayaran Dikonfirmasi",
  in_production: "Dalam Produksi",
  shipped: "Dikirim",
  delivered: "Selesai",
  cancelled: "Dibatalkan",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  waiting_payment: "bg-yellow-100 text-yellow-800",
  payment_confirmed: "bg-blue-100 text-blue-800",
  in_production: "bg-purple-100 text-purple-800",
  shipped: "bg-cyan-100 text-cyan-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  cushion: {
    shape: string;
    color: string;
    material: string;
  };
  paymentMethod: string;
  status: OrderStatus;
  trackingNumber: string;
  totalPrice: number;
  createdAt: string;
}

export const PAYMENT_LABELS: Record<string, string> = {
  transfer: "Bank Transfer",
  card: "Kartu Kredit / Debit",
  ewallet: "E-Wallet",
  qris: "QRIS",
};

const BASE_PRICE = 250000;

function calcPrice(materialId: string): number {
  const material = CUSHION_MATERIALS.find((m) => m.id === materialId);
  return Math.round(BASE_PRICE * (material?.priceMultiplier ?? 1));
}

const MOCK_ORDERS: AdminOrder[] = [
  {
    id: "1",
    orderNumber: "CC-1710000001-A1B2",
    customer: { name: "Rina Maharani", email: "rina.maharani@email.com", phone: "081234567890", address: "Jl. Sudirman No. 45, Jakarta Pusat, DKI Jakarta 10220" },
    cushion: { shape: "square", color: "sage", material: "sunbrella" },
    paymentMethod: "transfer",
    status: "delivered",
    trackingNumber: "JNE123456789ID",
    totalPrice: calcPrice("sunbrella"),
    createdAt: "2024-03-01T08:30:00Z",
  },
  {
    id: "2",
    orderNumber: "CC-1710000002-C3D4",
    customer: { name: "Budi Santoso", email: "budi.santoso@email.com", phone: "082345678901", address: "Jl. Gatot Subroto No. 12, Bandung, Jawa Barat 40252" },
    cushion: { shape: "rectangle", color: "navy", material: "olefin" },
    paymentMethod: "ewallet",
    status: "shipped",
    trackingNumber: "SICEPAT987654321",
    totalPrice: calcPrice("olefin"),
    createdAt: "2024-03-05T10:15:00Z",
  },
  {
    id: "3",
    orderNumber: "CC-1710000003-E5F6",
    customer: { name: "Dewi Anggraini", email: "dewi.anggraini@email.com", phone: "083456789012", address: "Jl. Diponegoro No. 78, Surabaya, Jawa Timur 60271" },
    cushion: { shape: "round", color: "terracotta", material: "canvas" },
    paymentMethod: "qris",
    status: "in_production",
    trackingNumber: "",
    totalPrice: calcPrice("canvas"),
    createdAt: "2024-03-08T14:00:00Z",
  },
  {
    id: "4",
    orderNumber: "CC-1710000004-G7H8",
    customer: { name: "Ahmad Fauzi", email: "ahmad.fauzi@email.com", phone: "084567890123", address: "Jl. Pemuda No. 33, Semarang, Jawa Tengah 50132" },
    cushion: { shape: "bolster", color: "mustard", material: "polyester" },
    paymentMethod: "card",
    status: "payment_confirmed",
    trackingNumber: "",
    totalPrice: calcPrice("polyester"),
    createdAt: "2024-03-10T09:45:00Z",
  },
  {
    id: "5",
    orderNumber: "CC-1710000005-I9J0",
    customer: { name: "Siti Rahayu", email: "siti.rahayu@email.com", phone: "085678901234", address: "Jl. Ahmad Yani No. 90, Medan, Sumatera Utara 20159" },
    cushion: { shape: "bench", color: "cream", material: "sunbrella" },
    paymentMethod: "transfer",
    status: "waiting_payment",
    trackingNumber: "",
    totalPrice: calcPrice("sunbrella"),
    createdAt: "2024-03-12T16:20:00Z",
  },
  {
    id: "6",
    orderNumber: "CC-1710000006-K1L2",
    customer: { name: "Hendra Kusuma", email: "hendra.kusuma@email.com", phone: "086789012345", address: "Jl. Malioboro No. 5, Yogyakarta 55213" },
    cushion: { shape: "lounger", color: "ocean", material: "olefin" },
    paymentMethod: "ewallet",
    status: "waiting_payment",
    trackingNumber: "",
    totalPrice: calcPrice("olefin"),
    createdAt: "2024-03-14T11:00:00Z",
  },
  {
    id: "7",
    orderNumber: "CC-1710000007-M3N4",
    customer: { name: "Rina Maharani", email: "rina.maharani@email.com", phone: "081234567890", address: "Jl. Sudirman No. 45, Jakarta Pusat, DKI Jakarta 10220" },
    cushion: { shape: "square", color: "charcoal", material: "canvas" },
    paymentMethod: "qris",
    status: "cancelled",
    trackingNumber: "",
    totalPrice: calcPrice("canvas"),
    createdAt: "2024-03-15T13:30:00Z",
  },
  {
    id: "8",
    orderNumber: "CC-1710000008-O5P6",
    customer: { name: "Fitriani Putri", email: "fitriani.putri@email.com", phone: "087890123456", address: "Jl. Sudirman No. 101, Makassar, Sulawesi Selatan 90111" },
    cushion: { shape: "rectangle", color: "coral", material: "sunbrella" },
    paymentMethod: "card",
    status: "in_production",
    trackingNumber: "",
    totalPrice: calcPrice("sunbrella"),
    createdAt: "2024-03-16T08:00:00Z",
  },
];

const STORAGE_KEY = "admin_orders";

export function getOrders(): AdminOrder[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as AdminOrder[];
  } catch {
    // ignore
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_ORDERS));
  return MOCK_ORDERS;
}

export function updateOrder(id: string, updates: Partial<Pick<AdminOrder, "status" | "trackingNumber">>): AdminOrder | null {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  orders[idx] = { ...orders[idx], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  return orders[idx];
}

export function getOrderById(id: string): AdminOrder | null {
  return getOrders().find((o) => o.id === id) ?? null;
}

export function getCustomers(): { name: string; email: string }[] {
  const orders = getOrders();
  const seen = new Map<string, { name: string; email: string }>();
  for (const o of orders) {
    if (!seen.has(o.customer.email)) {
      seen.set(o.customer.email, { name: o.customer.name, email: o.customer.email });
    }
  }
  return Array.from(seen.values());
}

export { CUSHION_SHAPES, CUSHION_COLORS, CUSHION_MATERIALS };
