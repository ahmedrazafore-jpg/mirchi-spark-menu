import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Staff Login | Mirchi Point Hyderabad" },
      {
        name: "description",
        content: "Mirchi Point staff login for the restaurant order dashboard.",
      },
      { property: "og:title", content: "Staff Login | Mirchi Point Hyderabad" },
      {
        property: "og:description",
        content: "Mirchi Point staff login for the restaurant order dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/orders" });
    });
  }, [navigate]);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    navigate({ to: "/admin/orders" });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-foreground">
      <Link to="/" aria-label="Mirchi Point home">
        <Logo />
      </Link>
      <form
        onSubmit={signIn}
        className="mt-8 w-full max-w-sm space-y-4 rounded-lg border border-border bg-card p-6"
      >
        <h1 className="font-display text-2xl tracking-wide">Staff login</h1>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded-md border border-border bg-surface-2 px-4 py-3 text-sm outline-none focus:border-primary"
        />
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-md border border-border bg-surface-2 px-4 py-3 text-sm outline-none focus:border-primary"
        />
        {error ? <p className="text-sm text-primary">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="h-12 w-full rounded-md bg-primary text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
