import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CreditCard, Building2, Wallet, Smartphone } from "lucide-react";
import type { CushionOrder } from "@/lib/cushion-data";

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const PAYMENT_METHODS = [
  { id: "transfer", name: "Bank Transfer", icon: Building2, desc: "BCA, Mandiri, BNI, BRI" },
  { id: "card", name: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard" },
  { id: "ewallet", name: "E-Wallet", icon: Wallet, desc: "GoPay, OVO, Dana, ShopeePay" },
  { id: "qris", name: "QRIS", icon: Smartphone, desc: "Scan QR from any app" },
];

const PaymentMethod = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { order: CushionOrder; customer: CustomerInfo } | null;

  if (!state) {
    navigate("/custom-order");
    return null;
  }

  const handleSelect = (methodId: string) => {
    const orderNumber = `CC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    navigate("/order-success", {
      state: {
        order: state.order,
        customer: state.customer,
        paymentMethod: methodId,
        orderNumber,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-display font-semibold text-lg">CushionCraft</span>
          </button>
          <span className="text-sm text-muted-foreground">Payment</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-lg">
        <div className="animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
            Choose Payment Method
          </h2>
          <p className="text-muted-foreground mb-8">Select how you'd like to pay for your custom cushion.</p>

          <div className="space-y-3">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                onClick={() => handleSelect(method.id)}
                className="w-full flex items-center gap-4 p-5 rounded-lg border-2 border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <method.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{method.name}</h3>
                  <p className="text-sm text-muted-foreground">{method.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentMethod;
