'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function StudioLauncher() {
  const backendUrl = process.env.NEXT_PUBLIC_SWARMUI_BACKEND_URL || '';
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        setEmail(data.user?.email ?? null);
      } catch {
        setEmail(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!backendUrl || loading) return;
    window.location.replace(backendUrl);
  }, [backendUrl, loading]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0d12] text-white">
        <p className="text-sm text-white/50">Loading session…</p>
      </main>
    );
  }

  if (backendUrl) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0d12] text-white">
        <p className="text-sm text-white/50">Opening SwarmUI engine…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 px-6 py-16 text-white">
      <h1 className="text-3xl font-bold">SwarmUI studio</h1>
      <p className="text-white/65">
        {email ? (
          <>
            Signed in as <strong>{email}</strong>.
          </>
        ) : (
          <>You are signed in.</>
        )}
      </p>
      <p className="text-white/65">
        Set <code className="rounded bg-white/10 px-1">NEXT_PUBLIC_SWARMUI_BACKEND_URL</code> in
        Vercel to your GPU host (RunPod, Vast, Docker). Vercel hosts OneID; SwarmUI&apos;s C# +
        ComfyUI engine cannot run on serverless.
      </p>
      <p className="text-sm text-white/40">
        Example: <code className="rounded bg-white/10 px-1">https://your-pod-id.proxy.runpod.net</code>
      </p>
    </main>
  );
}
