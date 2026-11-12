import { useState, type FormEvent } from "react";
import { Loader2, Lock, Mail, Palmtree, Sun, Waves } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";

type Mode = "signin" | "signup";

function describeAuthError(
  error: { message?: string | undefined; code?: string | undefined } | null | undefined,
): string {
  const message = error?.message ?? "";
  const code = error?.code ?? "";
  if (code === "invalid_credentials" || /invalid login credentials/i.test(message))
    return "E-mail ou senha incorretos.";
  if (code === "email_not_confirmed" || /email not confirmed/i.test(message))
    return "Confirme seu e-mail pelo link que enviamos antes de entrar.";
  if (code === "user_already_exists" || /already registered/i.test(message))
    return "Este e-mail já tem uma conta. Entre com sua senha.";
  if (
    code === "weak_password" ||
    (/password/i.test(message) && /(weak|short|least|pwned)/i.test(message))
  )
    return "Escolha uma senha mais forte, com pelo menos 6 caracteres.";
  if (code === "over_email_send_rate_limit" || /rate limit/i.test(message))
    return "Muitas tentativas seguidas. Aguarde alguns minutos e tente de novo.";
  if (code === "email_address_invalid" || /email address.*(not allowed|invalid)/i.test(message))
    return "Este e-mail não pode ser usado. Confira se foi digitado corretamente.";
  if (/fetch|network|failed to/i.test(message))
    return "Sem conexão com o servidor. Verifique sua internet e tente de novo.";
  return "Não foi possível continuar agora. Tente novamente em instantes.";
}

export function AuthScreen() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const switchMode = (next: Mode) => {
    setMode(next);
    setError(null);
    setNotice(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setNotice(null);
    const trimmedEmail = email.trim();
    if (mode === "signup") {
      if (password.length < 6) return setError("A senha precisa ter pelo menos 6 caracteres.");
      if (password !== confirmPassword) return setError("As senhas não são iguais.");
    }
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });
        if (signInError) setError(describeAuthError(signInError));
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (signUpError) setError(describeAuthError(signUpError));
        else if (!data.session) {
          setNotice(
            `Conta criada! Enviamos um link de confirmação para ${trimmedEmail}. Abra o e-mail, confirme e depois entre aqui.`,
          );
          setMode("signin");
          setPassword("");
          setConfirmPassword("");
        }
      }
    } catch (caught) {
      setError(describeAuthError(caught as { message?: string }));
    } finally {
      setBusy(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#e8e5dc] bg-[#fcfbf8] py-3 pl-10 pr-3 text-sm font-medium text-[#203b3b] outline-none transition focus:border-[#32a39a] focus:bg-white";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f3ed] px-4 py-10 text-[#203b3b]">
      <div className="grid w-full max-w-[960px] overflow-hidden rounded-[28px] bg-white shadow-xl shadow-[#123f42]/10 md:grid-cols-[1.05fr_1fr]">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#075c62] via-[#078b8b] to-[#54b6a2] p-9 text-white md:flex">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f5b76c] text-[#16484a] shadow-lg shadow-black/10">
              <Palmtree size={23} />
            </span>
            <span>
              <span className="block text-[16px] font-bold tracking-tight">Nossa viagem</span>
              <span className="mt-0.5 block text-[11px] text-[#c6eee1]">Memórias começam aqui</span>
            </span>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.16em]">
              <Sun size={13} /> Porto de Galinhas
            </span>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight">
              Tudo da viagem guardado em um só lugar.
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#d9f1e8]">
              Entre para ver o cofrinho, o checklist e as informações da viagem em qualquer
              aparelho.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#f5c58c]">
            <Waves size={13} /> Fevereiro, estamos chegando
          </div>
        </section>

        <section className="p-7 sm:p-10">
          <div className="mb-7 flex items-center gap-3 md:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5b76c] text-[#174649]">
              <Palmtree size={21} />
            </span>
            <span className="text-sm font-bold">Nossa viagem</span>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#8a9b91]">
            {mode === "signin" ? "Bem-vindo de volta" : "Primeiro acesso"}
          </p>
          <h1 className="mt-1 text-[26px] font-extrabold tracking-tight text-[#183f40]">
            {mode === "signin" ? "Entrar na sua conta" : "Criar sua conta"}
          </h1>

          <div
            role="tablist"
            aria-label="Entrar ou criar conta"
            className="mt-6 grid grid-cols-2 gap-1 rounded-2xl bg-[#f3f0e8] p-1"
          >
            {(["signin", "signup"] as const).map((option) => (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={mode === option}
                onClick={() => switchMode(option)}
                className={`rounded-xl py-2.5 text-xs font-extrabold transition ${mode === option ? "bg-white text-[#174649] shadow-sm" : "text-[#71847a] hover:text-[#174649]"}`}
              >
                {option === "signin" ? "Entrar" : "Criar conta"}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block text-xs font-bold text-[#49635b]">
              E-mail
              <span className="relative mt-1.5 block">
                <Mail
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8a9b91]"
                />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@exemplo.com"
                  className={inputClass}
                />
              </span>
            </label>
            <label className="block text-xs font-bold text-[#49635b]">
              Senha
              <span className="relative mt-1.5 block">
                <Lock
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8a9b91]"
                />
                <input
                  type="password"
                  required
                  minLength={mode === "signup" ? 6 : undefined}
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === "signup" ? "Pelo menos 6 caracteres" : "Sua senha"}
                  className={inputClass}
                />
              </span>
            </label>
            {mode === "signup" && (
              <label className="block text-xs font-bold text-[#49635b]">
                Confirmar senha
                <span className="relative mt-1.5 block">
                  <Lock
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8a9b91]"
                  />
                  <input
                    type="password"
                    required
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repita a senha"
                    className={inputClass}
                  />
                </span>
              </label>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-[#f2c9bd] bg-[#fdf0eb] px-3 py-2.5 text-xs font-semibold text-[#b3533a]"
              >
                {error}
              </p>
            )}
            {notice && (
              <p
                role="status"
                className="rounded-xl border border-[#cfe8dc] bg-[#f0f9f4] px-3 py-2.5 text-xs font-semibold text-[#2f7a57]"
              >
                {notice}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#16847e] py-3 text-sm font-extrabold text-white shadow-md shadow-[#16847e]/20 transition hover:bg-[#127069] disabled:cursor-wait disabled:opacity-70"
            >
              {busy && <Loader2 size={16} className="animate-spin" />}
              {mode === "signin" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#71847a]">
            {mode === "signin" ? "Ainda não tem conta? " : "Já tem conta? "}
            <button
              type="button"
              onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
              className="font-extrabold text-[#16847e] hover:underline"
            >
              {mode === "signin" ? "Criar conta" : "Entrar"}
            </button>
          </p>
        </section>
      </div>
    </div>
  );
}

export function TripStatusScreen({
  title,
  detail,
  action,
}: {
  title: string;
  detail?: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f3ed] px-4 text-[#203b3b]">
      <div className="max-w-sm text-center" role="status" aria-live="polite">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5b76c] text-[#174649]">
          {action ? <Palmtree size={23} /> : <Loader2 size={22} className="animate-spin" />}
        </span>
        <p className="mt-4 text-sm font-extrabold text-[#183f40]">{title}</p>
        {detail && <p className="mt-1.5 text-xs leading-5 text-[#71847a]">{detail}</p>}
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#16847e] px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#127069]"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
