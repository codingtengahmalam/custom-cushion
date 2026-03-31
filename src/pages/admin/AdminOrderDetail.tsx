import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getOrderById,
  updateOrder,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  PAYMENT_LABELS,
  CUSHION_SHAPES,
  CUSHION_COLORS,
  CUSHION_MATERIALS,
  type OrderStatus,
} from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Package, MapPin, User, Save } from "lucide-react";
import { toast } from "sonner";

const STATUS_OPTIONS = Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => ({
  value: value as OrderStatus,
  label,
}));

const AdminOrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const initial = getOrderById(id ?? "");
  const [order, setOrder] = useState(initial);
  const [status, setStatus] = useState<OrderStatus>(initial?.status ?? "waiting_payment");
  const [trackingNumber, setTrackingNumber] = useState(initial?.trackingNumber ?? "");
  const [saving, setSaving] = useState(false);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <p className="text-muted-foreground">Order tidak ditemukan.</p>
        <Button variant="outline" onClick={() => navigate("/admin/orders")}>
          Kembali ke Daftar Order
        </Button>
      </div>
    );
  }

  const shape = CUSHION_SHAPES.find((s) => s.id === order.cushion.shape);
  const color = CUSHION_COLORS.find((c) => c.id === order.cushion.color);
  const material = CUSHION_MATERIALS.find((m) => m.id === order.cushion.material);

  const handleSave = () => {
    setSaving(true);
    const updated = updateOrder(order.id, { status, trackingNumber });
    if (updated) {
      setOrder(updated);
      toast.success("Order berhasil diperbarui.");
    } else {
      toast.error("Gagal memperbarui order.");
    }
    setSaving(false);
  };

  const isDirty = status !== order.status || trackingNumber !== order.trackingNumber;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/admin/orders")}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>
      </div>

      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-semibold text-foreground">
            Order #{order.orderNumber}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Ditempatkan pada{" "}
            {new Date(order.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${ORDER_STATUS_COLORS[order.status]}`}
        >
          {ORDER_STATUS_LABELS[order.status]}
        </span>
      </div>

      {/* Manage Order */}
      <div className="bg-card border border-border rounded-lg p-5 space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <Package className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-foreground">Kelola Order</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status Order</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as OrderStatus)}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tracking">Nomor Resi</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="tracking"
                placeholder="Masukkan nomor resi..."
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSave} disabled={!isDirty || saving} className="gap-2">
          <Save className="w-4 h-4" />
          Simpan Perubahan
        </Button>
      </div>

      {/* Cushion Details */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-3 bg-muted border-b border-border">
          <h2 className="font-display font-semibold text-sm text-foreground">Detail Bantal</h2>
        </div>
        <div className="divide-y divide-border">
          <div className="flex justify-between items-center p-4">
            <span className="text-sm text-muted-foreground">Bentuk</span>
            <span className="text-sm font-medium text-foreground">
              {shape?.name} — {shape?.size}
            </span>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-sm text-muted-foreground">Warna</span>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: color?.hex }}
              />
              <span className="text-sm font-medium text-foreground">{color?.name}</span>
            </div>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-sm text-muted-foreground">Material</span>
            <span className="text-sm font-medium text-foreground">{material?.name}</span>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-sm text-muted-foreground">Metode Pembayaran</span>
            <span className="text-sm font-medium text-foreground">
              {PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}
            </span>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-sm text-muted-foreground">Total Harga</span>
            <span className="text-sm font-semibold text-foreground">
              Rp {order.totalPrice.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-3 bg-muted border-b border-border flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-sm text-foreground">Informasi Pelanggan</h2>
        </div>
        <div className="divide-y divide-border">
          <div className="flex justify-between items-center p-4">
            <span className="text-sm text-muted-foreground">Nama</span>
            <span className="text-sm font-medium text-foreground">{order.customer.name}</span>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm font-medium text-foreground">{order.customer.email}</span>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-sm text-muted-foreground">No. Telepon</span>
            <span className="text-sm font-medium text-foreground">{order.customer.phone}</span>
          </div>
          <div className="flex justify-between items-start p-4">
            <span className="text-sm text-muted-foreground">Alamat</span>
            <span className="text-sm font-medium text-foreground text-right max-w-[260px]">
              {order.customer.address}
            </span>
          </div>
        </div>
      </div>

      {/* Tracking Number Display */}
      {order.trackingNumber && (
        <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Nomor Resi</p>
            <p className="text-sm font-semibold text-foreground font-mono">{order.trackingNumber}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderDetail;
