import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy } from "lucide-react";
import { CUSHION_SHAPES, CUSHION_COLORS, CUSHION_MATERIALS } from "@/lib/cushion-data";
import type { CushionOrder } from "@/lib/cushion-data";
import { toast } from "sonner";

const PAYMENT_LABELS: Record<string, string> = {
  transfer: "Bank Transfer",
  card: "Credit / Debit Card",
  ewallet: "E-Wallet",
  qris: "QRIS",
};

interface SuccessState {
  order: CushionOrder;
  customer: { name: string; email: string; phone: string; address: string };
  paymentMethod: string;
  orderNumber: string;
}

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as SuccessState | null;

  if (!state) {
    navigate("/");
    return null;
  }

  const { order, customer, paymentMethod, orderNumber } = state;
  const shape = CUSHION_SHAPES.find((s) => s.id === order.shape);
  const color = CUSHION_COLORS.find((c) => c.id === order.color);
  const material = CUSHION_MATERIALS.find((m) => m.id === order.material);

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber);
    toast.success("Order number copied!");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-display font-semibold text-lg text-foreground">CushionCraft</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-lg">
        <div className="animate-fade-in text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
            Order Placed Successfully!
          </h2>
          <p className="text-muted-foreground mt-2">Thank you for your order, {customer.name}.</p>
        </div>

        {/* Order Number - Most Important */}
        <div className="bg-primary/5 border-2 border-primary rounded-lg p-6 text-center mb-6 animate-fade-in">
          <p className="text-sm font-medium text-muted-foreground mb-1">Order Number</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-wide">
              {orderNumber}
            </span>
            <button onClick={copyOrderNumber} className="text-muted-foreground hover:text-primary transition-colors" title="Copy">
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Save this number for tracking your order</p>
        </div>

        {/* Order Summary */}
        <div className="bg-card border border-border rounded-lg overflow-hidden mb-6 animate-fade-in">
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
              <span className="text-sm text-muted-foreground">Payment</span>
              <span className="text-sm font-medium text-foreground">{PAYMENT_LABELS[paymentMethod] || paymentMethod}</span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-card border border-border rounded-lg overflow-hidden mb-8 animate-fade-in">
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
              <span className="text-sm font-medium text-foreground text-right max-w-[200px]">{customer.address}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button className="w-full" size="lg" onClick={() => navigate("/order-detail", { state: { order, customer, paymentMethod, orderNumber } })}>
            View Order Detail
          </Button>
          <Button variant="outline" className="w-full" size="lg" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </main>
    </div>
  );
};

export default OrderSuccess;
