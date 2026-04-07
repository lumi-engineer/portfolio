"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contact } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SemanticHeading } from "@/components/ui/SemanticHeading";

function ContactIcon({
  children,
  href,
  label,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="glass flex h-14 w-14 items-center justify-center rounded-2xl text-[var(--foreground)] transition"
      whileHover={{
        y: -6,
        boxShadow: "0 0 28px rgba(56,189,248,0.35)",
        scale: 1.05,
      }}
      aria-label={label}
    >
      {children}
    </motion.a>
  );
}

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [mailtoFallback, setMailtoFallback] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setMailtoFallback(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      if (data.fallback && data.mailto) {
        setMailtoFallback(data.mailto);
        window.open(data.mailto, "_blank");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="section-container relative text-center">
        <SectionLabel variant="contact">Contact</SectionLabel>

        <SemanticHeading
          as="h2"
          text={contact.headline}
          gradient
          className="section-title font-quote"
        />
        <p className="mt-3 text-lg text-[var(--muted)]">{contact.subtext}</p>

        <motion.p
          className="mt-6 font-mono text-base text-sky-300 md:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {contact.email}
        </motion.p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ContactIcon
            href={`mailto:${contact.email}`}
            label="Email Lucas"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16v16H4z" stroke="none" fill="currentColor" fillOpacity="0" />
              <path d="M4 4l8 8 8-8M4 20l6-6M20 20l-6-6" />
            </svg>
          </ContactIcon>
          <ContactIcon
            href={`https://wa.me/${contact.whatsapp}`}
            label="WhatsApp"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </ContactIcon>
        </div>

        <p className="mt-3 text-sm text-[var(--muted)]">{contact.whatsappDisplay}</p>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-10 max-w-lg space-y-4 text-left"
        >
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-sky-500/50"
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-sky-500/50"
          />
          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-sky-500/50"
          />
          <motion.button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 py-3.5 font-semibold text-white disabled:opacity-60"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </motion.button>
        </form>

        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-auto mt-6 max-w-md rounded-2xl border border-emerald-500/40 bg-emerald-950/30 px-6 py-4"
            >
              <motion.span
                className="text-3xl"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6 }}
              >
                ✓
              </motion.span>
              <p className="mt-2 font-medium text-emerald-300">
                Message sent successfully!
              </p>
              {mailtoFallback && (
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Opened your email client as backup.
                </p>
              )}
            </motion.div>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-red-400"
            >
              Could not send — please email{" "}
              <a href={`mailto:${contact.email}`} className="underline">
                {contact.email}
              </a>
            </motion.p>
          )}
        </AnimatePresence>

        <p className="mt-16 font-mono text-xs uppercase tracking-[0.35em] text-[var(--muted)]">
          © {new Date().getFullYear()} Lucas Daniel
        </p>
      </div>
    </section>
  );
}
