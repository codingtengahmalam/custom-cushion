import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, Truck, CreditCard, MapPin, Clock } from "lucide-react";
import { CUSHION_SHAPES, CUSHION_COLORS, CUSHION_MATERIALS } from "@/lib/cushion-data";
import type { CushionOrder } from "@/lib/cushion-data";

const PAYMENT_LABELS: Record<string, string> = {
  transfer: "Bank Transfer",
  card: "Credit / Debit Card",
  ewallet: "E-Wallet",
  qris: "QRIS",
};

interface OrderDetailState {
  order: CushionOrder;
  customer: { name: string; email: string; phone: string; address: string };
  paymentMethod: string;
  orderNumber: string;
}

const TRACKING_STEPS = [
  { label: "Order Placed", date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }), done: true },
  { label: "Payment Confirmed", date: "Pending", done: false },
  { label: "In Production", date: "—", done: false },
  { label: "Shipped", date: "—", done: false },
  { label: "Delivered", date: "—", done: false },
];

const OrderDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as OrderDetailState | null;

  if (!state) {
    navigate("/");
    return null;
  }

  const { order, customer, paymentMethod, orderNumber } = state;
  const shape = CUSHION_SHAPES.find((s) => s.id === order.shape);
  const color = CUSHION_COLORS.find((c) => c.id === order.color);
  const material = CUSHION_MATERIALS.find((m) => m.id === order.material);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-display font-semibold text-lg">CushionCraft</span>
          </button>
          <span className="text-sm text-muted-foreground">Order Detail</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-2xl space-y-6">
        {/* Order Number & Statuses */}
        <div className="animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-1">
            Order #{orderNumber}
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            Placed on {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
              <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                <Package className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Order Status</p>
                <p className="text-sm font-semibold text-accent">Waiting Payment</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
              <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Payment Status</p>
                <p className="text-sm font-semibold text-accent">Unpaid</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking */}
        <div className="bg-card border border-border rounded-lg p-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-5">
            <Truck className="w-5 h-5 text-primary" />
            <h3 className="font-display font-semibold text-foreground">Tracking & Shipment</h3>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted mb-6">
            <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Tracking Number</p>
              <p className="text-sm font-medium text-foreground">Not available yet</p>
            </div>
          </div>

          <div className="relative pl-6">
            {TRACKING_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-start gap-4 pb-6 last:pb-0 relative">
                {/* Line */}
                {i < TRACKING_STEPS.length - 1 && (
                  <div className={`absolute left-[7px] top-5 w-0.5 h-full ${step.done ? "bg-primary" : "bg-border"}`} />
                )}
                {/* Dot */}
                <div className={`w-4 h-4 rounded-full shrink-0 -ml-6 mt-0.5 border-2 ${step.done ? "bg-primary border-primary" : "bg-background border-border"}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${step.done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{step.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cushion Details */}
        <div className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in">
          <div className="px-5 py-3 bg-muted">
            <h3 className="font-display font-semibold text-sm text-foreground">Cushion Details</h3>
          </div>
          <div className="divide-y divide-border">
            <div className="flex justify-between p-4">
              <span className="text-sm text-muted-foreground">Shape</span>
              <span className="text-sm font-medium text-foreground">{shape?.name} — {shape?.size}</span>
            </div>
            <div className="flex justify-between items-center p-4">
              <span className="text-sm text-muted-foreground">Color</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: color?.hex }} />
                <span className="text-sm font-medium text-foreground">{color?.name}</span>
              </div>
            </div>
            <div className="flex justify-between p-4">
              <span className="text-sm text-muted-foreground">Material</span>
              <span className="text-sm font-medium text-foreground">{material?.name}</span>
            </div>
            <div className="flex justify-between p-4">
              <span className="text-sm text-muted-foreground">Payment Method</span>
              <span className="text-sm font-medium text-foreground">{PAYMENT_LABELS[paymentMethod] || paymentMethod}</span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in">
          <div className="px-5 py-3 bg-muted">
            <h3 className="font-display font-semibold text-sm text-foreground">Delivery Information</h3>
          </div>
          <div className="divide-y divide-border">
            <div className="flex justify-between p-4">
              <span className="text-sm text-muted-foreground">Name</span>
              <span className="text-sm font-medium text-foreground">{customer.name}</span>
            </div>
            <div className="flex justify-between p-4">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="text-sm font-medium text-foreground">{customer.email}</span>
            </div>
            <div className="flex justify-between p-4">
              <span className="text-sm text-muted-foreground">Phone</span>
              <span className="text-sm font-medium text-foreground">{customer.phone}</span>
            </div>
            <div className="flex justify-between p-4">
              <span className="text-sm text-muted-foreground">Address</span>
              <span className="text-sm font-medium text-foreground text-right max-w-[250px]">{customer.address}</span>
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </main>
    </div>
  );
};

export default OrderDetail;
