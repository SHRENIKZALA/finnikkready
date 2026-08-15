'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockKeyhole, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/hrm/supabase/client';
import { Button } from '@/components/hrm/ui/button';
import { Input } from '@/components/hrm/ui/input';
import { Label } from '@/components/hrm/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/hrm/ui/card';

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    if (password.length < 6) {
      setError('Use at least 6 characters for your new password.');
      return;
    }
    if (password !== confirmation) {
      setError('The passwords do not match.');
      return;
    }

    setLoading(true);
    const { error: updateError } = await createClient().auth.updateUser({ password });
    setLoading(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setMessage('Your password has been updated. Redirecting to staff sign in…');
    setTimeout(() => router.push('/hrm/auth/signin'), 900);
  };

  return (
    <Card className="border-white/10 bg-slate-950/70 text-white shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
      <CardHeader className="p-7 sm:p-8">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 text-slate-950">
          <LockKeyhole className="h-5 w-5" />
        </div>
        <CardTitle className="text-2xl text-white">Set a new password</CardTitle>
        <CardDescription className="mt-2 text-slate-300">Choose a new password for your FinniKK staff account.</CardDescription>
      </CardHeader>
      <CardContent className="p-7 pt-0 sm:p-8 sm:pt-0">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-slate-200">New password</Label>
            <Input id="new-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required minLength={6} className="border-white/10 bg-white/5 text-white placeholder:text-slate-500" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-slate-200">Confirm password</Label>
            <Input id="confirm-password" type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="new-password" required minLength={6} className="border-white/10 bg-white/5 text-white placeholder:text-slate-500" />
          </div>
          {error && <div role="alert" className="rounded-lg border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">{error}</div>}
          {message && <div role="status" className="rounded-lg border border-teal-300/20 bg-teal-300/10 p-3 text-sm text-teal-100">{message}</div>}
          <Button type="submit" disabled={loading} className="h-11 w-full bg-gradient-to-r from-blue-500 to-teal-400 font-semibold text-slate-950 hover:from-blue-400 hover:to-teal-300">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Updating…' : 'Update password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
