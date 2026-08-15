'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/hrm/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/hrm/ui/card";
import { Input } from "@/components/hrm/ui/input";
import { Label } from "@/components/hrm/ui/label";
import { createClient } from '@/utils/hrm/supabase/client';
import { addKnowledge, updateKnowledge, getKnowledge } from '@/utils/hrm/supabase/queries';
import { Knowledge } from '@/utils/hrm/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { CustomCheckbox } from '@/components/hrm/ui/custom-checkbox';
import { useTenant } from '@/utils/hrm/tenant-context';
import { toast } from '@/components/hrm/ui/use-toast';
import { Textarea } from '@/components/hrm/ui/textarea';

export default function AddKnowledgeForm({ knowledgeId }: { knowledgeId: string | null }) {
  const [formData, setFormData] = useState<Knowledge | {}>({
    title: '',
    description: '',
    is_active: true,
    is_deleted: false,
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { currentTenant } = useTenant();

  useEffect(() => {
    const fetchKnowledge = async () => {
      if (!currentTenant) {
        return;
      }

      if (knowledgeId) {
        const supabase: SupabaseClient = createClient();
        const knowledge = await getKnowledge(supabase, knowledgeId);
        if (knowledge && knowledge.tenant_id === currentTenant.id) {
          setFormData(knowledge);
        } else {
          toast({
            title: "Error",
            description: "Knowledge not found or belongs to different tenant.",
            variant: "destructive",
          });
          router.push('/hrm/master/knowledge');
        }
      }
    };

    fetchKnowledge();
  }, [knowledgeId, currentTenant]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentTenant) {
      setError('No tenant selected. Please select a tenant from account settings.');
      return;
    }

    if (!(formData as Knowledge).title) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const supabase = createClient();
      const knowledgeData = {
        ...formData,
        tenant_id: currentTenant.id
      };

      if (knowledgeId) {
        await updateKnowledge(supabase, { id: knowledgeId, ...knowledgeData });
      } else {
        await addKnowledge(supabase, knowledgeData);
      }

      router.push('/hrm/master/knowledge');
    } catch (error: any) {
      setError(error.message || 'Failed to save knowledge.');
      console.error('Error saving knowledge:', error);
    }
  };

  if (!currentTenant) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-lg font-semibold">No Tenant Selected</h2>
          <p className="text-muted-foreground">Please select a tenant from your account settings.</p>
          <Button 
            className="mt-4"
            onClick={() => router.push('/hrm/account')}
          >
            Go to Account Settings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>{knowledgeId ? 'Edit Knowledge' : 'Add New Knowledge'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={(formData as Knowledge).title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={(formData as Knowledge).description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              <div>
                <CustomCheckbox
                  id="is_active"
                  label="Active"
                  checked={(formData as Knowledge).is_active}
                  onChange={(checked) => 
                    setFormData(prev => ({ ...prev, is_active: checked }))
                  }
                />
              </div>
              {error && <div className="text-red-500 bg-red-100 p-2 rounded">{error}</div>}
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => router.push('/hrm/master/knowledge')}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 