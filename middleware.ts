import type { NextRequest } from 'next/server';
import { updateSession } from '@/utils/hrm/supabase/middleware';

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ['/hrm/:path*'],
};
