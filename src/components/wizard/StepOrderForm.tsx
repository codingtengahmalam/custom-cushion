import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { CushionOrder } from "@/lib/cushion-data";

interface StepOrderFormProps {
  order: CushionOrder;
}

const StepOrderForm = ({ order }: StepOrderFormProps) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Order placed successfully! We'll contact you soon.");
      console.log("Order submitted:", { cushion: order, customer: form });
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
        Your Details
      </h2>
      <p className="text-muted-foreground mb-8">Fill in your information to complete the order.</p>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" value={form.name} onChange={(e) => handleChange("name", e.target.value)} maxLength={100} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} maxLength={255} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="+62 812 3456 7890" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} maxLength={20} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Delivery Address</Label>
          <Textarea id="address" placeholder="Full address including city and postal code" value={form.address} onChange={(e) => handleChange("address", e.target.value)} maxLength={500} rows={3} />
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "Placing Order..." : "Place Order"}
        </Button>
      </form>
    </div>
  );
};

export default StepOrderForm;
