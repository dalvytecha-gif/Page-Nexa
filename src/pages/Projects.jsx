import React, { useEffect, useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useOrg } from '@/hooks/useOrg';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectForm from '@/components/projects/ProjectForm';

export default function Projects() {
  const { organizationId, user } = useOrg();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  const load = useCallback(async () => {
    if (!organizationId) return;
    const q = { organization_id: organizationId };
    const [p, t] = await Promise.all([
      base44.entities.Project.filter(q, '-created_date', 200),
      base44.entities.Task.filter(q, '-created_date', 500),
    ]);
    setProjects(p);
    setTasks(t);
    setLoading(false);
  }, [organizationId]);

  useEffect(() => { load(); }, [load]);

  const handleSubmit = async (form) => {
    await base44.entities.Project.create({ ...form, organization_id: organizationId, owner_id: user?.id });
    setFormOpen(false);
    load();
  };

  if (loading) {
    return <div className="p-6 flex justify-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold">Projects</h1>
          <p className="text-sm text-muted-foreground">Group tasks, documents and objectives.</p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> New project
        </Button>
      </div>

      {projects.length === 0 ? (
        <p className="text-sm text-muted-foreground py-10 text-center">No projects yet. Create your first one.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} taskCount={tasks.filter((t) => t.project_id === p.id).length} />
          ))}
        </div>
      )}

      <ProjectForm open={formOpen} onOpenChange={setFormOpen} onSubmit={handleSubmit} />
    </div>
  );
}
