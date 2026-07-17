"use client";

import { useState } from "react";
import { ArrowRight, LockKeyhole, UserRound } from "lucide-react";
import { signIn, signUp } from "@/app/account/actions";
import { createClient } from "@/lib/supabase/client";
import { publicEnv } from "@/lib/env";

export function AuthPanel({ error, success }: { error?: string; success?: string }) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [oauthBusy, setOauthBusy] = useState(false);

  async function continueWithGoogle() {
    setOauthBusy(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${publicEnv.NEXT_PUBLIC_APP_URL}/auth/callback` },
    });
    setOauthBusy(false);
  }

  return (
    <div className="auth-shell container">
      <section className="auth-story">
        <p className="eyebrow">A quieter way to shop</p>
        <h1>Your considered collection, kept together.</h1>
        <p>Save addresses, revisit orders, and move smoothly from discovery to delivery.</p>
        <div className="auth-benefit"><UserRound size={20} /><span><strong>One account</strong> for orders, addresses, and wishlists.</span></div>
        <div className="auth-benefit"><LockKeyhole size={20} /><span><strong>Secure by default</strong> with Supabase authentication.</span></div>
      </section>
      <section className="auth-card">
        <div className="auth-tabs" role="tablist">
          <button className={mode === "signin" ? "active" : ""} onClick={() => setMode("signin")}>Sign in</button>
          <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>Create account</button>
        </div>
        <h2>{mode === "signin" ? "Welcome back." : "Join North & Form."}</h2>
        <p>{mode === "signin" ? "Enter your details to continue." : "Create an account in less than a minute."}</p>
        {error && <div className="form-message error">{error}</div>}
        {success && <div className="form-message success">{success}</div>}
        <form action={mode === "signin" ? signIn : signUp} className="auth-form">
          {mode === "signup" && <label>Full name<input name="fullName" autoComplete="name" required /></label>}
          <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
          <label>Password<input name="password" type="password" minLength={8} autoComplete={mode === "signin" ? "current-password" : "new-password"} required /></label>
          <button className="button button-dark button-full" type="submit">{mode === "signin" ? "Sign in" : "Create account"}<ArrowRight size={16} /></button>
        </form>
        <div className="auth-divider"><span>or</span></div>
        <button className="button button-outline button-full" onClick={continueWithGoogle} disabled={oauthBusy}>{oauthBusy ? "Connecting…" : "Continue with Google"}</button>
      </section>
    </div>
  );
}
