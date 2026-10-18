import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-white/40">OWeb constellation</p>
      <h1 className="text-4xl font-black tracking-tight">SwarmUI</h1>
      <p className="text-lg text-white/65">
        Modular AI image, video, and audio generation. This Vercel deployment is the OneID gate and
        launchpad — the GPU engine runs on your RunPod, Vast, or self-hosted Docker host.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/login"
          className="rounded-lg bg-[#7c5cff] px-5 py-2.5 text-sm font-bold text-white no-underline"
        >
          Sign in
        </Link>
        <Link
          href="/studio"
          className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white no-underline"
        >
          Open studio
        </Link>
      </div>
    </main>
  );
}
