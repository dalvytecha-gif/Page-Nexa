import React, { useEffect, useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useOrg } from '@/hooks/useOrg';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SaleTable from '@/components/sales/SaleTable';
import SaleForm from '@/components/sales/SaleForm';
import { createSaleWithItems } from '@/lib/salesEngine';

export default function Sales() {
  const { organizationId } = useOrg();
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  const load = useCallback(async () => {
    if (!organizationId) return;
    const q = { organization_id: organizationId };
    const [s, c, p] = await Promise.all([
      base44.entities.Sale.filter(q, '-created_date', 200),
      base44.entities.Customer.filter(q, '-created_date', 200),
      base44.entities.Product.filter(q, '-created_date', 200),
    ]);
    setSales(s);
    setCustomers(c);
    setProducts(p);
    setLoading(false);
  }, [organizationId]);

  useEffect(() => { load(); }, [load]);

  const handleSubmit = async ({ customerId, status, saleDate, items }) => {
    await createSaleWithItems({ organizationId, customerId, status, saleDate, items });
    setFormOpen(false);
    load();
  };

  const customersById = Object.fromEntries(customers.map((c) => [c.id, c]));

  if (loading) {
    return <div className="p-6 flex justify-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold">Sales</h1>
          <p className="text-sm text-muted-foreground">Track sales orders and revenue.</p>
        </div>
        <Button onClick={() => setFormOpen(true)} disabled={customers.length === 0 || products.length === 0}>
          <Plus className="w-4 h-4 mr-1" /> New sale
        </Button>
      </div>

      {(customers.length === 0 || products.length === 0) && (
        <p className="text-sm text-muted-foreground bg-muted/40 rounded-lg p-3">
          Add at least one customer (CRM) and one product (Stock) before creating a sale.
        </p>
      )}

      <div className="bg-card border border-border rounded-xl p-2">
        <SaleTable sales={sales} customersById={customersById} />
      </div>

      <SaleForm open={formOpen} onOpenChange={setFormOpen} onSubmit={handleSubmit} customers={customers} products={products} />
    </div>
  );
}
