import React from 'react';
import Link from 'next/link';
import { VMark } from './icons';

export function Logo({ cls = "logo" }: { cls?: string }) {
  return (
    <Link href="/" className={cls}>
      <VMark />
      <span className="nm">Veylan<span className="grn">Labs</span></span>
    </Link>
  );
}
