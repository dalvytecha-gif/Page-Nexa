import React, { useEffect, useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useOrg } from '@/hooks/useOrg';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function Settings() {
  const { organizationId, organizationRole, user } = useOrg();
  const [org, setOrg] = useState(null);
  const [members, setMembers] = useState([]);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!organizationId) return;
    const [o, allUsers] = await Promise.all([
      base44.entities.Organization.get(organizationId),
      base44.entities.User.list(),
    ]);
    setOrg(o);
    setMembers(allUsers.filter((u) => u.organization_id === organizationId));
  }, [organizationId]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await base44.entities.Organization.update(organizationId, { name: org.name, industry: org.industry });
    setSaving(false);
  };

  if (!org) {
    return <div className="p-6 flex justify-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" /></div>;
  }

  const isOwnerOrAdmin = organizationRole === 'owner' || organizationRole === 'admin';

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-heading font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">Organization profile and team members.</p>
      </div>

      <form onSubmit={handleSave} className="bg-card border border-border rounded-xl p-5 space-y-3">
        <h3 className="font-heading font-semibold text-sm mb-2">Company profile</h3>
        <div className="space-y-1.5">
          <Label>Company name</Label>
          <Input value={org.name} onChange={(e) => setOrg({ ...org, name: e.target.value })} disabled={!isOwnerOrAdmin} />
        </div>
        <div className="space-y-1.5">
          <Label>Industry</Label>
          <Input value={org.industry || ''} onChange={(e) => setOrg({ ...org, industry: e.target.value })} disabled={!isOwnerOrAdmin} />
        </div>
        {isOwnerOrAdmin && <Button type="submit" disabled={saving}>Save changes</Button>}
      </form>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-heading font-semibold text-sm mb-4">Team members</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-medium">{m.full_name}{m.id === user?.id ? ' (you)' : ''}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell><Badge variant="secondary">{m.organization_role || 'employee'}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
