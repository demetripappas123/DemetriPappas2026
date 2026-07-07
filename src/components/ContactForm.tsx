"use client";

import { useState, type FormEvent } from "react";

const inputClassName =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500";

const labelClassName =
  "mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400";

type FormStatus = "idle" | "loading" | "success" | "error";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const business = String(data.get("business") ?? "").trim();
    const notes = String(data.get("notes") ?? "").trim();

    if (!name || !email || !notes) {
      setStatus("error");
      setErrorMessage("Name, email, and notes are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          business,
          notes,
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to send message.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClassName}>
            Full name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            className={inputClassName}
            disabled={status === "loading"}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClassName}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className={inputClassName}
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className={labelClassName}>
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="text"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(555) 555-5555"
            className={inputClassName}
            disabled={status === "loading"}
          />
        </div>

        <div>
          <label htmlFor="contact-business" className={labelClassName}>
            Business
          </label>
          <input
            id="contact-business"
            name="business"
            type="text"
            autoComplete="organization"
            placeholder="Company or organization"
            className={inputClassName}
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-notes" className={labelClassName}>
          Notes
        </label>
        <textarea
          id="contact-notes"
          name="notes"
          required
          rows={5}
          placeholder="Tell me about the role, project, or how I can help."
          className={`${inputClassName} resize-y min-h-[8rem]`}
          disabled={status === "loading"}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-[#1c1c1c] px-6 py-3 text-sm font-medium uppercase tracking-wide text-zinc-100 transition-colors hover:bg-[#252525] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send message"}
        </button>

        {status === "success" ? (
          <p className="text-sm text-emerald-700 dark:text-emerald-400">
            Message sent — I&apos;ll get back to you soon.
          </p>
        ) : null}

        {status === "error" ? (
          <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
        ) : null}
      </div>
    </form>
  );
}
