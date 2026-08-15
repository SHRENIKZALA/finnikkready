'use client'

import { useState } from 'react';
import { Button } from "@/components/hrm/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/hrm/ui/card";
import { Input } from "@/components/hrm/ui/input";
import { Label } from "@/components/hrm/ui/label";
import { createClient } from '@/utils/hrm/supabase/client';
import { useTenant } from '@/utils/hrm/tenant-context';
import { toast } from "@/components/hrm/ui/use-toast";
import { bulkAddPublicHolidays } from '@/utils/hrm/supabase/queries';
import { parse } from 'papaparse';

interface Holiday {
  date: string;
  name: string;
  tenant_id: string;
}

export default function BulkImportHolidays({ onComplete }: { onComplete: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { currentTenant } = useTenant();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv') {
        setError('Please upload a CSV file');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const validateDate = (dateStr: string): boolean => {
    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date.getTime());
  };

  const handleUpload = async () => {
    if (!file || !currentTenant) return;

    setLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const csvData = event.target?.result as string;
          parse(csvData, {
            header: true,
            complete: async (results) => {
              const holidays: Holiday[] = [];
              const errors: string[] = [];

              results.data.forEach((row: any, index: number) => {
                if (!row.date || !row.name) {
                  errors.push(`Row ${index + 1}: Missing date or name`);
                  return;
                }

                if (!validateDate(row.date)) {
                  errors.push(`Row ${index + 1}: Invalid date format. Use YYYY-MM-DD`);
                  return;
                }

                holidays.push({
                  date: row.date,
                  name: row.name,
                  tenant_id: currentTenant.id
                });
              });

              if (errors.length > 0) {
                setError(`Validation errors:\n${errors.join('\n')}`);
                return;
              }

              const supabase = createClient();
              await bulkAddPublicHolidays(supabase, holidays);

              toast({
                title: "Success",
                description: `${holidays.length} holidays imported successfully.`,
              });

              onComplete();
            },
            error: (error: Error) => {
              setError(`Failed to parse CSV: ${error.message}`);
            }
          });
        } catch (error) {
          setError('Failed to process file');
          console.error('Error processing file:', error);
        }
      };

      reader.readAsText(file);
    } catch (error) {
      setError('Failed to upload file');
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = () => {
    const template = 'date,name\n2024-01-01,New Year\'s Day\n2024-12-25,Christmas Day';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'holidays_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Import Holidays</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Upload CSV File</Label>
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              CSV should contain columns: date (YYYY-MM-DD), name
            </p>
          </div>

          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleDownloadTemplate}
            >
              Download Template
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!file || loading}
            >
              {loading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>

          {error && (
            <div className="text-red-500 bg-red-100 p-2 rounded whitespace-pre-line">
              {error}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 