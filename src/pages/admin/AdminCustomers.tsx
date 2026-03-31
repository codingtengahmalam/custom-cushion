import { useMemo, useState } from "react";
import { getCustomers, getOrders } from "@/lib/admin-data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const AdminCustomers = () => {
  const [search, setSearch] = useState("");

  const customers = useMemo(() => {
    const all = getCustomers();
    const orders = getOrders();

    return all.map((c) => {
      const customerOrders = orders.filter((o) => o.customer.email === c.email);
      return {
        ...c,
        orderCount: customerOrders.length,
      };
    });
  }, []);

  const filtered = useMemo(() => {
    if (!search) return customers;
    const q = search.toLowerCase();
    return customers.filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  }, [customers, search]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-display font-semibold text-foreground">Daftar Pelanggan</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{customers.length} pelanggan terdaftar</p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Cari nama atau email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">#</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Nama</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Jumlah Order</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-muted-foreground">
                    Tidak ada pelanggan ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((customer, idx) => (
                  <tr
                    key={customer.email}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-muted-foreground">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{customer.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{customer.email}</td>
                    <td className="px-4 py-3 text-foreground">
                      <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {customer.orderCount}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
