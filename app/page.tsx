"use client"

import { useState } from "react"

const STATS = [
  { value: "Ø 3,2", label: "Schulden pro Person in Deutschland", icon: "⚡" },
  { value: "€14.600", label: "Ø Privatschulden pro Haushalt", icon: "📊" },
  { value: "68%", label: "kennen ihre Gesamtschulden nicht", icon: "🔍" },
]

const TRUST = ["PSD2 konform", "BaFin-geregelt", "DSGVO-sicher", "Kein Spam"]

export default function SuzyWaitlist() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit() {
    if (!email || !email.includes("@")) return
    setStatus("loading")
    setErrorMessage("")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      
      if (res.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
        setErrorMessage(data.error || "Etwas ist schiefgelaufen.")
      }
    } catch {
      setStatus("error")
      setErrorMessage("Etwas ist schiefgelaufen — bitte erneut versuchen.")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col relative overflow-hidden">
      {/* Floating blobs */}
      <div 
        className="absolute -top-[120px] -right-[80px] w-[520px] h-[520px] rounded-full pointer-events-none animate-float-blob"
        style={{
          background: "radial-gradient(circle, rgba(13,148,136,0.09) 0%, transparent 70%)",
        }}
      />
      <div 
        className="absolute -bottom-[80px] -left-[60px] w-[400px] h-[400px] rounded-full pointer-events-none animate-float-blob-reverse"
        style={{
          background: "radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Dot grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(13,148,136,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Nav */}
      <nav className="animate-fade-up animation-delay-1 px-6 md:px-12 py-5 flex justify-between items-center border-b border-black/5 relative z-10 bg-background/80 backdrop-blur-md">
        <span className="font-serif font-semibold text-[22px] text-primary tracking-tight">
          Suzy
        </span>
        <span className="inline-flex items-center gap-1.5 bg-primary/[0.08] text-primary text-[11px] font-medium tracking-[0.08em] px-3.5 py-1.5 rounded-full border border-primary/20">
          ✦ Private Beta
        </span>
      </nav>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-14 md:py-18 relative z-10 gap-9">
        {/* Eyebrow */}
        <div className="animate-fade-up animation-delay-1 text-[11px] tracking-[0.18em] font-medium text-muted-foreground uppercase">
          Schulden-Management für Deutschland
        </div>

        {/* Headline */}
        <div className="animate-fade-up animation-delay-2 text-center">
          <h1 className="font-serif font-bold text-[clamp(46px,8vw,96px)] leading-none tracking-tight text-foreground mb-2">
            Deine Schulden.
          </h1>
          <h1 className="font-serif italic font-semibold text-[clamp(46px,8vw,96px)] leading-none tracking-tight text-primary">
            Endlich im Griff.
          </h1>
        </div>

        {/* Sub */}
        <p className="animate-fade-up animation-delay-3 text-[clamp(14px,1.8vw,17px)] leading-relaxed text-muted-foreground text-center max-w-[460px] font-light">
          Suzy verbindet alle deine Kredite, zeigt dir das Gesamtbild
          <br />und findet automatisch bessere Konditionen für dich.
        </p>

        {/* Form */}
        <div className="animate-fade-up animation-delay-4 flex flex-col items-center gap-3.5 w-full max-w-[460px]">
          {status !== "success" ? (
            <>
              <div className="flex w-full shadow-[0_2px_24px_rgba(0,0,0,0.06)]">
                <input
                  type="email"
                  placeholder="deine@email.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="flex-1 bg-card border-[1.5px] border-border border-r-0 px-5 py-4 text-foreground font-sans text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(13,148,136,0.08)] transition-all"
                />
                <button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  className="bg-primary border-[1.5px] border-primary px-6 py-4 text-primary-foreground font-sans text-[13px] font-medium tracking-[0.02em] cursor-pointer whitespace-nowrap transition-all hover:bg-[#0F766E] hover:border-[#0F766E] hover:shadow-[0_4px_20px_rgba(13,148,136,0.25)] hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "···" : "Früher Zugang →"}
                </button>
              </div>

              {status === "error" && (
                <span className="text-xs text-destructive">
                  {errorMessage}
                </span>
              )}

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-4">
                {TRUST.map((t, i) => (
                  <span key={i} className="inline-flex items-center gap-2 font-sans text-[11px] text-muted-foreground font-normal">
                    <span className="w-[5px] h-[5px] rounded-full bg-border" />
                    {t}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full p-6 bg-primary/[0.06] border-[1.5px] border-primary/25 text-center animate-fade-up">
              <div className="font-serif text-xl text-primary mb-1.5">
                Willkommen an Bord ✓
              </div>
              <div className="text-[13px] text-muted-foreground">
                Wir melden uns bald bei dir.
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="animate-fade-up animation-delay-5 flex gap-3 w-full max-w-[640px] flex-wrap">
          {STATS.map((s, i) => (
            <div 
              key={i} 
              className="flex-1 min-w-[180px] p-7 text-center bg-card border-[1.5px] border-secondary transition-all relative overflow-hidden group hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            >
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              <div className="text-xl mb-2.5">{s.icon}</div>
              <div className="font-serif font-semibold text-[clamp(22px,3.5vw,30px)] text-primary mb-1.5 tracking-tight">
                {s.value}
              </div>
              <div className="text-[11px] text-muted-foreground leading-relaxed font-normal">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="animate-fade-up animation-delay-6 px-6 md:px-12 py-4 border-t border-black/5 flex justify-between items-center relative z-10 bg-background/80">
        <span className="text-[11px] text-muted-foreground/70">
          © 2025 Suzy · Freiburg, Deutschland
        </span>
        <span className="text-[11px] text-muted-foreground/70">
          hello@suzy.de
        </span>
      </footer>
    </div>
  )
}
