import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useOrg } from '@/hooks/useOrg';
import KpiCard from '@/components/dashboard/KpiCard';
import AlertsPanel from '@/components/dashboard/AlertsPanel';
import {
  DollarSign, TrendingDown, ShoppingBag, Package, CheckSquare, Users,
} from 'lucide-react';
import {
  sumSales, sumExpenses, sumPurchases, stockValue, lowStockProducts,
  overdueTasks, pendingApprovals, openLeadsCount,
} from '@/lib/kpi';

export default function Dashboard() {
  const { organizationId } = useOrg();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!organizationId) return;
    const load = async () => {
      const q = { organization_id: organizationId };
      const [sales, expenses, purchases, products, tasks, leads] = await Promise.all([
        base44.entities.Sale.filter(q, '-created_date', 200),
        base44.entities.Expense.filter(q, '-created_date', 200),
        base44.entities.Purchase.filter(q, '-created_date', 200),
        base44.entities.Product.filter(q, '-created_date', 200),
        base44.entities.Task.filter(q, '-created_date', 200),
        base44.entities.Lead.filter(q, '-created_date', 200),
      ]);
      setData({ sales, expenses, purchases, products, tasks, leads });
      setLoading(false);
    };
    load();
  }, [organizationId]);

  if (loading || !data) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  const { sales, expenses, purchases, products, tasks, leads } = data;
  const low = lowStockProducts(products);
  const late = overdueTasks(tasks);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Live overview of your business activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Sales revenue" value={`$${sumSales(sales).toLocaleString()}`} icon={DollarSign} tone="positive" />
        <KpiCard label="Expenses" value={`$${sumExpenses(expenses).toLocaleString()}`} icon={TrendingDown} tone="warning" />
        <KpiCard label="Purchases" value={`$${sumPurchases(purchases).toLocaleString()}`} icon={ShoppingBag} />
        <KpiCard label="Stock value" value={`$${stockValue(products).toLocaleString()}`} icon={Package} />
        <KpiCard label="Open leads" value={openLeadsCount(leads)} icon={Users} />
        <KpiCard label="Pending tasks" value={tasks.filter((t) => t.status !== 'done').length} icon={CheckSquare} />
        <KpiCard label="Pending approvals" value={pendingApprovals(expenses, purchases)} tone="warning" />
        <KpiCard label="Overdue tasks" value={late.length} tone={late.length > 0 ? 'negative' : 'default'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AlertsPanel
          title="Low stock products"
          items={low}
          emptyText="No product is running low on stock."
          renderItem={(p) => `${p.name} — ${p.stock_quantity ?? 0} ${p.unit || 'units'} left`}
        />
        <AlertsPanel
          title="Overdue tasks"
          items={late}
          emptyText="No overdue tasks."
          renderItem={(t) => `${t.title} — due ${t.due_date}`}
        />
      </div>
    </div>
  );
}
