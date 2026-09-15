import React, { useEffect, useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useOrg } from '@/hooks/useOrg';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DocumentGrid from '@/components/documents/DocumentGrid';
import DocumentUploadDialog from '@/components/documents/DocumentUploadDialog';

export default function Documents() {
  const { organizationId } = useOrg();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);

  const load = useCallback(async () => {
    if (!organizationId) return;
    const data = await base44.entities.Document.filter({ organization_id: organizationId }, '-created_date', 200);
    setDocuments(data);
    setLoading(false);
  }, [organizationId]);

  useEffect(() => { load(); }, [load]);

  const handleSubmit = async (form) => {
    await base44.entities.Document.create({ ...form, organization_id: organizationId });
    setUploadOpen(false);
    load();
  };

  if (loading) {
    return <div className="p-6 flex justify-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold">Documents</h1>
          <p className="text-sm text-muted-foreground">Business files, contracts, invoices and reports.</p>
        </div>
        <Button onClick={() => setUploadOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Upload document
        </Button>
      </div>

      <DocumentGrid documents={documents} />
      <DocumentUploadDialog open={uploadOpen} onOpenChange={setUploadOpen} onSubmit={handleSubmit} />
    </div>
  );
}
