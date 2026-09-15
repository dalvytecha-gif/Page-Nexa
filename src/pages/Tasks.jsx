import React, { useEffect, useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useOrg } from '@/hooks/useOrg';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import TaskBoard from '@/components/tasks/TaskBoard';
import TaskForm from '@/components/tasks/TaskForm';

export default function Tasks() {
  const { organizationId } = useOrg();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [projectFilter, setProjectFilter] = useState(
    new URLSearchParams(window.location.search).get('project') || 'all'
  );

  const load = useCallback(async () => {
    if (!organizationId) return;
    const q = { organization_id: organizationId };
    const [t, p] = await Promise.all([
      base44.entities.Task.filter(q, '-created_date', 500),
      base44.entities.Project.filter(q, '-created_date', 200),
    ]);
    setTasks(t);
    setProjects(p);
    setLoading(false);
  }, [organizationId]);

  useEffect(() => { load(); }, [load]);

  const handleStatusChange = async (task, status) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status } : t)));
    await base44.entities.Task.update(task.id, { status });
  };

  const handleSubmit = async (form) => {
    if (editingTask) {
      await base44.entities.Task.update(editingTask.id, form);
    } else {
      await base44.entities.Task.create({ ...form, organization_id: organizationId, status: 'todo' });
    }
    setFormOpen(false);
    setEditingTask(null);
    load();
  };

  const visibleTasks = projectFilter === 'all' ? tasks : tasks.filter((t) => t.project_id === projectFilter);

  if (loading) {
    return <div className="p-6 flex justify-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-heading font-semibold">Tasks</h1>
          <p className="text-sm text-muted-foreground">Drag cards across the board to update their status.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-44"><SelectValue placeholder="All projects" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All projects</SelectItem>
              {projects.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={() => { setEditingTask(null); setFormOpen(true); }}>
            <Plus className="w-4 h-4 mr-1" /> New task
          </Button>
        </div>
      </div>

      {visibleTasks.length === 0 ? (
        <p className="text-sm text-muted-foreground py-10 text-center">No tasks yet. Create your first one.</p>
      ) : (
        <TaskBoard tasks={visibleTasks} onStatusChange={handleStatusChange} onEdit={(t) => { setEditingTask(t); setFormOpen(true); }} />
      )}

      <TaskForm open={formOpen} onOpenChange={setFormOpen} onSubmit={handleSubmit} projects={projects} initial={editingTask} />
    </div>
  );
}
