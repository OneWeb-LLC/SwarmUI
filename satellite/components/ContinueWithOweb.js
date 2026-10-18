'use client';

import { owebLoginUrl } from '@/lib/sui/constants';

export default function ContinueWithOweb({ label = 'Continue with OWeb', className = '' }) {
  const href = owebLoginUrl({ launch: true });

  return (
    <a
      href={href}
      className={`inline-flex w-full items-center justify-center rounded-lg border border-[#7c5cff]/40 bg-[#7c5cff]/10 px-5 py-2.5 text-sm font-semibold text-[#b8a4ff] no-underline transition hover:bg-[#7c5cff]/20 ${className}`}
    >
      {label}
    </a>
  );
}
