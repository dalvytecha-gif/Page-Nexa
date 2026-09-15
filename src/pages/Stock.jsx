import React, { useEffect, useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useOrg } from '@/hooks/useOrg';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus } from 'lucide-react';
import ProductTable from '@/components/stock/ProductTable';
import ProductForm from '@/components/stock/ProductForm';
import MovementForm from '@/components/stock/MovementForm';

export default function Stock() {
  const { organizationId } = useOrg();
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productFormOpen, setProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [movementFormOpen, setMovementFormOpen] = useState(false);

  const load = useCallback(async () => {
    if (!organizationId) return;
    const q = { organization_id: organizationId };
    const [p, m] = await Promise.all([
      base44.entities.Product.filter(q, '-created_date', 200),
      base44.entities.InventoryMovement.filter(q, '-created_date', 100),
    ]);
    setProducts(p);
    setMovements(m);
    setLoading(false);
  }, [organizationId]);

  useEffect(() => { load(); }, [load]);

  const handleProductSubmit = async (form) => {
    if (editingProduct) {
      const { stock_quantity, ...rest } = form;
      await base44.entities.Product.update(editingProduct.id, rest);
    } else {
      await base44.entities.Product.create({ ...form, organization_id: organizationId });
    }
    setProductFormOpen(false);
    setEditingProduct(null);
    load();
  };

  const handleMovementSubmit = async ({ productId, type, quantity, notes }) => {
    const product = products.find((p) => p.id === productId);
    const delta = ['stock_in', 'release'].includes(type) ? quantity : -quantity;
    await base44.entities.InventoryMovement.create({
      organization_id: organizationId, product_id: productId, type, quantity, notes,
    });
    await base44.entities.Product.update(productId, {
      stock_quantity: (product?.stock_quantity || 0) + delta,
    });
    setMovementFormOpen(false);
    load();
  };

  const productsById = Object.fromEntries(products.map((p) => [p.id, p]));

  if (loading) {
    return <div className="p-6 flex justify-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-heading font-semibold">Stock</h1>
        <p className="text-sm text-muted-foreground">Products and inventory movements.</p>
      </div>

      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="movements">Movements</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-4 space-y-3">
          <div className="flex justify-end">
            <Button onClick={() => { setEditingProduct(null); setProductFormOpen(true); }}>
              <Plus className="w-4 h-4 mr-1" /> New product
            </Button>
          </div>
          <div className="bg-card border border-border rounded-xl p-2">
            <ProductTable products={products} onEdit={(p) => { setEditingProduct(p); setProductFormOpen(true); }} />
          </div>
        </TabsContent>

        <TabsContent value="movements" className="mt-4 space-y-3">
          <div className="flex justify-end">
            <Button onClick={() => setMovementFormOpen(true)} disabled={products.length === 0}>
              <Plus className="w-4 h-4 mr-1" /> Record movement
            </Button>
          </div>
          <div className="bg-card border border-border rounded-xl p-2">
            {movements.length === 0 ? (
              <p className="text-sm text-muted-foreground py-10 text-center">No stock movements recorded yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movements.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>{new Date(m.created_date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{productsById[m.product_id]?.name || 'Unknown'}</TableCell>
                      <TableCell className="capitalize">{m.type.replace('_', ' ')}</TableCell>
                      <TableCell className="text-right">{m.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <ProductForm open={productFormOpen} onOpenChange={setProductFormOpen} initial={editingProduct} onSubmit={handleProductSubmit} />
      <MovementForm open={movementFormOpen} onOpenChange={setMovementFormOpen} products={products} onSubmit={handleMovementSubmit} />
    </div>
  );
}
