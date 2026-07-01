import HeroContent from "@/components/HeroContent";
import HeroSocialLinks from "@/components/HeroSocialLinks";
import { documentLinks } from "@/components/document-links";
import { FadeIn } from "@/components/FadeIn";
import { FileText, Mail, ScrollText } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <FadeIn
      as="section"
      id="hero"
      className="relative -mt-28 flex min-h-screen flex-col pt-28 pb-10 sm:pb-12"
    >
      <div className="relative flex min-h-0 flex-1 flex-col max-sm:gap-8">
        <div className="mx-auto w-full max-w-[270px] shrink-0 max-sm:order-3 sm:mx-0 sm:w-[270px]">
          <div className="flex w-full flex-col">
            <Image
              src="/headshot.png"
              alt="Demetri Pappas"
              width={270}
              height={340}
              priority
              className="h-auto w-full object-cover"
            />

            <div className="bg-[#1c1c1c] px-5 pt-4 pb-5">
              <p className="text-center text-base font-semibold tracking-tight text-zinc-50 sm:text-lg">
                Demetri Pappas
              </p>

              <div
                className="mx-auto mt-3 h-px w-full bg-zinc-200/35"
                aria-hidden="true"
              />

              <HeroSocialLinks />
            </div>
          </div>
        </div>

        <div className="overflow-visible max-sm:order-1 max-sm:mt-0 mt-8 sm:absolute sm:inset-y-0 sm:mt-0 sm:left-[calc(270px+5rem)] sm:right-0 lg:left-[calc(270px+6rem)]">
          <HeroContent />
        </div>
      </div>

      <div className="mt-6 flex shrink-0 flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
        <a
          href={documentLinks.resume.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-[#1c1c1c] px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-100 transition-colors hover:bg-[#252525] sm:px-6 sm:py-3 sm:text-sm"
        >
          <FileText className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.75} aria-hidden="true" />
          {documentLinks.resume.label}
        </a>

        <a
          href="#contact"
          className="flex items-center gap-2 rounded-full bg-[#1c1c1c] px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-100 transition-colors hover:bg-[#252525] max-sm:max-w-full sm:px-6 sm:py-3 sm:text-sm"
        >
          <Mail className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.75} aria-hidden="true" />
          Contact
        </a>

        <a
          href={documentLinks.cv.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-[#1c1c1c] px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-100 transition-colors hover:bg-[#252525] max-sm:max-w-full sm:px-6 sm:py-3 sm:text-sm"
        >
          <ScrollText className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.75} aria-hidden="true" />
          {documentLinks.cv.label}
        </a>
      </div>
    </FadeIn>
  );
}
