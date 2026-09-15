import React, { useEffect, useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useOrg } from '@/hooks/useOrg';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ExpenseTable from '@/components/expenses/ExpenseTable';
import ExpenseForm from '@/components/expenses/ExpenseForm';
import { sumExpenses } from '@/lib/kpi';

export default function Expenses() {
  const { organizationId, user } = useOrg();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  const load = useCallback(async () => {
    if (!organizationId) return;
    const data = await base44.entities.Expense.filter({ organization_id: organizationId }, '-created_date', 200);
    setExpenses(data);
    setLoading(false);
  }, [organizationId]);

  useEffect(() => { load(); }, [load]);

  const handleSubmit = async (form) => {
    await base44.entities.Expense.create({ ...form, organization_id: organizationId, submitted_by: user?.id, status: 'submitted' });
    setFormOpen(false);
    load();
  };

  const handleStatusChange = async (expense, status) => {
    setExpenses((prev) => prev.map((e) => (e.id === expense.id ? { ...e, status } : e)));
    await base44.entities.Expense.update(expense.id, { status });
  };

  if (loading) {
    return <div className="p-6 flex justify-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold">Expenses</h1>
          <p className="text-sm text-muted-foreground">Total approved so far: ${sumExpenses(expenses).toLocaleString()}</p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> New expense
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl p-2">
        <ExpenseTable expenses={expenses} onStatusChange={handleStatusChange} />
      </div>

      <ExpenseForm open={formOpen} onOpenChange={setFormOpen} onSubmit={handleSubmit} />
    </div>
  );
}
