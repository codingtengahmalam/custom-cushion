import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  getOrders,
  getCustomers,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  type OrderStatus,
} from "@/lib/admin-data";
import { ShoppingBag, Users, Banknote, Clock } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const STATUS_HEX: Record<OrderStatus, string> = {
  waiting_payment: "#ca8a04",
  payment_confirmed: "#2563eb",
  in_production: "#9333ea",
  shipped: "#0891b2",
  delivered: "#16a34a",
  cancelled: "#dc2626",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const orders = useMemo(() => getOrders(), []);
  const customers = useMemo(() => getCustomers(), []);

  const totalRevenue = useMemo(
    () =>
      orders
        .filter((o) => o.status !== "cancelled")
        .reduce((sum, o) => sum + o.totalPrice, 0),
    [orders]
  );

  const pendingCount = useMemo(
    () => orders.filter((o) => o.status === "waiting_payment").length,
    [orders]
  );

  const statusData = useMemo(() => {
    const counts: Partial<Record<OrderStatus, number>> = {};
    for (const o of orders) {
      counts[o.status] = (counts[o.status] ?? 0) + 1;
    }
    return (Object.keys(ORDER_STATUS_LABELS) as OrderStatus[])
      .filter((s) => (counts[s] ?? 0) > 0)
      .map((s) => ({
        status: s,
        label: ORDER_STATUS_LABELS[s],
        count: counts[s] ?? 0,
        color: STATUS_HEX[s],
      }));
  }, [orders]);

  const recentOrders = useMemo(
    () =>
      [...orders]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    [orders]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Ringkasan aktivitas toko</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<ShoppingBag className="w-5 h-5 text-primary" />}
          label="Total Order"
          value={orders.length.toString()}
          bg="bg-primary/10"
        />
        <StatCard
          icon={<Banknote className="w-5 h-5 text-green-600" />}
          label="Total Pendapatan"
          value={`Rp ${totalRevenue.toLocaleString("id-ID")}`}
          bg="bg-green-100"
          small
        />
        <StatCard
          icon={<Users className="w-5 h-5 text-blue-600" />}
          label="Total Pelanggan"
          value={customers.length.toString()}
          bg="bg-blue-100"
        />
        <StatCard
          icon={<Clock className="w-5 h-5 text-yellow-600" />}
          label="Menunggu Pembayaran"
          value={pendingCount.toString()}
          bg="bg-yellow-100"
        />
      </div>

      {/* Status Chart */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h2 className="font-display font-semibold text-foreground mb-4">Order per Status</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={statusData} barSize={32}>
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              width={24}
            />
            <Tooltip
              formatter={(value: number) => [`${value} order`, "Jumlah"]}
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {statusData.map((entry) => (
                <Cell key={entry.status} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-3 bg-muted/50 border-b border-border flex items-center justify-between">
          <h2 className="font-display font-semibold text-sm text-foreground">Order Terbaru</h2>
          <button
            onClick={() => navigate("/admin/orders")}
            className="text-xs text-primary hover:underline"
          >
            Lihat semua →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">No. Order</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Pelanggan</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Total</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => navigate(`/admin/orders/${order.id}`)}
                >
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{order.orderNumber}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{order.customer.name}</div>
                    <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                  </td>
                  <td className="px-4 py-3 text-foreground whitespace-nowrap">
                    Rp {order.totalPrice.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${ORDER_STATUS_COLORS[order.status as OrderStatus]}`}
                    >
                      {ORDER_STATUS_LABELS[order.status as OrderStatus]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  bg: string;
  small?: boolean;
}

const StatCard = ({ icon, label, value, bg, small }: StatCardProps) => (
  <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
    <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center shrink-0`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`font-semibold text-foreground truncate ${small ? "text-sm" : "text-lg"}`}>{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
