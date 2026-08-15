'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/hrm/supabase/client';
import { Button } from '@/components/hrm/ui/button';
import { Input } from '@/components/hrm/ui/input';
import { Label } from '@/components/hrm/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/hrm/ui/card';
import { verifyUserTenant } from '@/utils/hrm/auth-helpers';
import { useTenant } from '@/utils/hrm/tenant-context';
import { ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

export type AuthState = 'signin' | 'signup' | 'forgot_password';

interface AuthFormProps {
  state?: AuthState;
}

export default function AuthForm({ state = 'signin' }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setCurrentTenant, refreshMembership } = useTenant();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const supabase = createClient();

      if (state === 'signin') {
        const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        if (!user) throw new Error('No user was returned from sign-in.');

        const defaultTenant = await verifyUserTenant(supabase, user.id);
        setCurrentTenant(defaultTenant);
        await refreshMembership(defaultTenant.id);
        localStorage.setItem('currentTenant', JSON.stringify(defaultTenant));
        router.push('/hrm');
        router.refresh();
      } else if (state === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        setMessage('Account created. Check your email to confirm access, then return here to sign in.');
      } else {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/hrm/auth/reset-password`,
        });
        if (resetError) throw resetError;
        setMessage('A password reset link has been sent if this email is registered.');
      }
    } catch (caughtError) {
      const nextError = caughtError instanceof Error ? caughtError.message : 'Unable to complete the request.';
      setError(nextError);
      if (state === 'signin') await createClient().auth.signOut();
    } finally {
      setLoading(false);
    }
  };

  const title = state === 'signup' ? 'Create staff account' : state === 'forgot_password' ? 'Reset your password' : 'Staff sign in';
  const description = state === 'signup'
    ? 'Request access to the FinniKK workspace.'
    : state === 'forgot_password'
      ? 'Enter your work email and we will send a secure reset link.'
      : 'Use your FinniKK work credentials to access the HRM workspace.';
  const buttonText = state === 'signup' ? 'Create account' : state === 'forgot_password' ? 'Send reset link' : 'Continue to workspace';

  return (
    <Card className="border-white/10 bg-slate-950/70 text-white shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
      <CardHeader className="space-y-5 p-7 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-28">
            <Image src="/brand/finnikk-logo.png" alt="FinniKK" fill sizes="112px" className="object-contain object-left brightness-0 invert" />
          </div>
          <span className="rounded-full border border-teal-300/25 bg-teal-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-200">Staff</span>
        </div>
        <div>
          <CardTitle className="text-2xl tracking-tight text-white">{title}</CardTitle>
          <CardDescription className="mt-2 text-slate-300">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-7 pt-0 sm:p-8 sm:pt-0">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="hrm-email" className="text-slate-200">Work email</Label>
            <Input id="hrm-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" placeholder="name@finnikk.com" className="border-white/10 bg-white/5 text-white placeholder:text-slate-500" />
          </div>
          {state !== 'forgot_password' && (
            <div className="space-y-2">
              <Label htmlFor="hrm-password" className="text-slate-200">Password</Label>
              <Input id="hrm-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} autoComplete={state === 'signup' ? 'new-password' : 'current-password'} placeholder="Enter your password" className="border-white/10 bg-white/5 text-white placeholder:text-slate-500" />
            </div>
          )}
          {error && <div role="alert" className="rounded-lg border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">{error}</div>}
          {message && <div role="status" className="rounded-lg border border-teal-300/20 bg-teal-300/10 p-3 text-sm text-teal-100">{message}</div>}
          <Button type="submit" className="h-11 w-full bg-gradient-to-r from-blue-500 to-teal-400 font-semibold text-slate-950 hover:from-blue-400 hover:to-teal-300" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
            {loading ? 'Working…' : buttonText}
          </Button>
        </form>
        {state === 'signin' && (
          <div className="mt-5 flex items-center justify-between gap-4 text-xs">
            <Link href="/hrm/auth/forgot_password" className="text-slate-400 transition hover:text-teal-200">Forgot password?</Link>
            <Link href="/hrm/auth/signup" className="font-medium text-blue-300 transition hover:text-teal-200">Create staff account</Link>
          </div>
        )}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-xs leading-5 text-slate-400">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
          <span>Access is limited to staff accounts assigned to a FinniKK workspace in Supabase.</span>
        </div>
      </CardContent>
    </Card>
  );
}
