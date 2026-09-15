import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useOrg } from '@/hooks/useOrg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Boxes, Loader2 } from 'lucide-react';

export default function Onboarding() {
  const { organizationId, loading, refresh } = useOrg();
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (loading) return null;
  if (organizationId) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const org = await base44.entities.Organization.create({ name, industry });
      await base44.auth.updateMe({ organization_id: org.id, organization_role: 'owner' });
      await refresh();
      window.location.href = '/';
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Boxes className="w-7 h-7 text-primary" />
          <span className="font-heading font-semibold text-xl">NexaOS</span>
        </div>
        <h1 className="text-xl font-heading font-semibold mb-1">Create your organization</h1>
        <p className="text-sm text-muted-foreground mb-6">
          This sets up your company workspace — data, users, and every module are scoped to it.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="org-name">Company name</Label>
            <Input id="org-name" value={name} onChange={(e) => setName(e.target.value)} required autoFocus />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-industry">Industry</Label>
            <Input id="org-industry" value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="e.g. Retail, Consulting" />
          </div>
          <Button type="submit" className="w-full h-11 font-medium" disabled={submitting}>
            {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Create organization
          </Button>
        </form>
      </div>
    </div>
  );
}
