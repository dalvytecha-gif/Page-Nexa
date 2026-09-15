import React, { useEffect, useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useOrg } from '@/hooks/useOrg';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PurchaseTable from '@/components/purchases/PurchaseTable';
import PurchaseForm from '@/components/purchases/PurchaseForm';
import SupplierTable from '@/components/purchases/SupplierTable';
import SupplierForm from '@/components/purchases/SupplierForm';
import { createPurchaseWithItems } from '@/lib/purchaseEngine';

export default function Purchases() {
  const { organizationId } = useOrg();
  const [purchases, setPurchases] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [supplierFormOpen, setSupplierFormOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  const load = useCallback(async () => {
    if (!organizationId) return;
    const q = { organization_id: organizationId };
    const [p, s, pr] = await Promise.all([
      base44.entities.Purchase.filter(q, '-created_date', 200),
      base44.entities.Supplier.filter(q, '-created_date', 200),
      base44.entities.Product.filter(q, '-created_date', 200),
    ]);
    setPurchases(p);
    setSuppliers(s);
    setProducts(pr);
    setLoading(false);
  }, [organizationId]);

  useEffect(() => { load(); }, [load]);

  const handleSubmit = async ({ supplierId, status, orderDate, items }) => {
    await createPurchaseWithItems({ organizationId, supplierId, status, orderDate, items });
    setFormOpen(false);
    load();
  };

  const handleSupplierSubmit = async (form) => {
    if (editingSupplier) {
      await base44.entities.Supplier.update(editingSupplier.id, form);
    } else {
      await base44.entities.Supplier.create({ ...form, organization_id: organizationId });
    }
    setSupplierFormOpen(false);
    setEditingSupplier(null);
    load();
  };

  const suppliersById = Object.fromEntries(suppliers.map((s) => [s.id, s]));

  if (loading) {
    return <div className="p-6 flex justify-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-heading font-semibold">Purchases</h1>
        <p className="text-sm text-muted-foreground">Requests, orders and receptions from suppliers.</p>
      </div>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Purchase orders</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-4 space-y-3">
          <div className="flex justify-end">
            <Button onClick={() => setFormOpen(true)} disabled={suppliers.length === 0 || products.length === 0}>
              <Plus className="w-4 h-4 mr-1" /> New purchase
            </Button>
          </div>
          {(suppliers.length === 0 || products.length === 0) && (
            <p className="text-sm text-muted-foreground bg-muted/40 rounded-lg p-3">
              Add at least one supplier and one product (Stock) before creating a purchase.
            </p>
          )}
          <div className="bg-card border border-border rounded-xl p-2">
            <PurchaseTable purchases={purchases} suppliersById={suppliersById} />
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="mt-4 space-y-3">
          <div className="flex justify-end">
            <Button onClick={() => { setEditingSupplier(null); setSupplierFormOpen(true); }}>
              <Plus className="w-4 h-4 mr-1" /> New supplier
            </Button>
          </div>
          <div className="bg-card border border-border rounded-xl p-2">
            <SupplierTable suppliers={suppliers} onEdit={(s) => { setEditingSupplier(s); setSupplierFormOpen(true); }} />
          </div>
        </TabsContent>
      </Tabs>

      <PurchaseForm open={formOpen} onOpenChange={setFormOpen} onSubmit={handleSubmit} suppliers={suppliers} products={products} />
      <SupplierForm open={supplierFormOpen} onOpenChange={setSupplierFormOpen} initial={editingSupplier} onSubmit={handleSupplierSubmit} />
    </div>
  );
}
