import ContactForm from "@/components/ContactForm";
import ContactSocialLinks from "@/components/ContactSocialLinks";
import { documentLinks } from "@/components/document-links";
import { FadeIn } from "@/components/FadeIn";
import { FileText, ScrollText } from "lucide-react";

const documentButtonClassName =
  "flex items-center gap-2 rounded-full bg-[#1c1c1c] px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-100 transition-colors hover:bg-[#252525] sm:px-6 sm:py-3 sm:text-sm";

export default function Contact() {
  return (
    <FadeIn
      as="section"
      id="contact"
      className="border-t border-zinc-200 py-24 dark:border-zinc-800"
    >
      <h2 className="text-left text-3xl font-bold uppercase tracking-tight min-[400px]:text-4xl sm:text-5xl">
        <span className="text-foreground">Get in touch.</span>
      </h2>
      <p className="mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
        Open to opportunities and collaborations. Send a note below or reach
        out through any of my profiles.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-16">
        <ContactForm />

        <aside className="lg:pt-1">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Also find me on
          </p>
          <div className="mt-4">
            <ContactSocialLinks />
          </div>

          <p className="mt-8 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Documents
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={documentLinks.resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className={documentButtonClassName}
            >
              <FileText
                className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              {documentLinks.resume.label}
            </a>
            <a
              href={documentLinks.cv.href}
              target="_blank"
              rel="noopener noreferrer"
              className={documentButtonClassName}
            >
              <ScrollText
                className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              {documentLinks.cv.label}
            </a>
          </div>
        </aside>
      </div>
    </FadeIn>
  );
}
