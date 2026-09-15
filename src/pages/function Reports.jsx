import React, { useEffect, useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useOrg } from '@/hooks/useOrg';
import KpiCard from '@/components/dashboard/KpiCard';
import { DollarSign, TrendingDown, ShoppingBag, Package } from 'lucide-react';
import { sumSales, sumExpenses, sumPurchases, stockValue } from '@/lib/kpi';

export default function Reports() {
  const { organizationId } = useOrg();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!organizationId) return;
    const q = { organization_id: organizationId };
    const [sales, expenses, purchases, products] = await Promise.all([
      base44.entities.Sale.filter(q, '-created_date', 500),
      base44.entities.Expense.filter(q, '-created_date', 500),
      base44.entities.Purchase.filter(q, '-created_date', 500),
      base44.entities.Product.filter(q, '-created_date', 500),
    ]);
    setData({ sales, expenses, purchases, products });
    setLoading(false);
  }, [organizationId]);

  useEffect(() => { load(); }, [load]);

  if (loading || !data) {
    return <div className="p-6 flex justify-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" /></div>;
  }

  const { sales, expenses, purchases, products } = data;
  const revenue = sumSales(sales);
  const expenseTotal = sumExpenses(expenses);
  const purchaseTotal = sumPurchases(purchases);
  const margin = revenue - expenseTotal - purchaseTotal;

  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + (e.amount || 0);
    return acc;
  }, {});

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold">Reports</h1>
        <p className="text-sm text-muted-foreground">Figures derived from the same central data as the dashboard.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Sales revenue" value={`$${revenue.toLocaleString()}`} icon={DollarSign} tone="positive" />
        <KpiCard label="Total expenses" value={`$${expenseTotal.toLocaleString()}`} icon={TrendingDown} tone="warning" />
        <KpiCard label="Total purchases" value={`$${purchaseTotal.toLocaleString()}`} icon={ShoppingBag} />
        <KpiCard label="Net margin" value={`$${margin.toLocaleString()}`} icon={Package} tone={margin >= 0 ? 'positive' : 'negative'} />
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-heading font-semibold text-sm mb-4">Expenses by category</h3>
        {Object.keys(byCategory).length === 0 ? (
          <p className="text-sm text-muted-foreground">No expenses recorded yet.</p>
        ) : (
          <div className="space-y-2">
            {Object.entries(byCategory).map(([cat, amount]) => (
              <div key={cat} className="flex items-center justify-between text-sm">
                <span>{cat}</span>
                <span className="font-medium">${amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-heading font-semibold text-sm mb-4">Stock valuation</h3>
        <p className="text-2xl font-heading font-semibold">${stockValue(products).toLocaleString()}</p>
        <p className="text-sm text-muted-foreground mt-1">Across {products.length} product{products.length === 1 ? '' : 's'}, at cost price.</p>
      </div>
    </div>
  );
}
