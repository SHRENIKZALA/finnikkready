'use client';

import Link from 'next/link';
import { LogoIcon } from '../landing/Icons';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className = "", iconOnly = false }: LogoProps) {
  return (
    <Link href="/hrm" className={`flex items-center gap-2 ${className}`}>
      <LogoIcon />
      {iconOnly ? null : <span className="font-bold text-base tracking-tight lg:text-xl">FinniKK <span className="font-normal text-teal-300">Staff</span></span>}
    </Link>
  );
} 