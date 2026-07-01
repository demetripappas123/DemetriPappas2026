import HeroContent from "@/components/HeroContent";
import HeroSocialLinks from "@/components/HeroSocialLinks";
import { SocialHeroUndock } from "@/components/SocialHeroUndock";
import { FileText, Mail, ScrollText } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative -mt-28 flex min-h-screen flex-col pt-28 pb-10 sm:pb-12"
    >
      <SocialHeroUndock />
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="mx-auto w-[270px] sm:mx-0">
          <div className="flex w-[270px] flex-col">
            <Image
              src="/headshot.png"
              alt="Demetri Pappas"
              width={270}
              height={340}
              priority
              className="object-cover"
            />

            <div className="bg-[#1c1c1c] px-5 pt-4 pb-5">
              <p className="text-center text-lg font-semibold tracking-tight text-zinc-50">
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

        <div className="mt-8 sm:absolute sm:inset-y-0 sm:mt-0 sm:left-[calc(270px+5rem)] sm:right-0 lg:left-[calc(270px+6rem)]">
          <HeroContent />
        </div>
      </div>

      <div className="mt-6 flex shrink-0 flex-wrap items-center justify-center gap-4 sm:mt-8">
        <a
          href="/resume.pdf"
          className="flex items-center gap-2 rounded-full bg-[#1c1c1c] px-6 py-3 text-sm font-medium uppercase tracking-wide text-zinc-100 transition-colors hover:bg-[#252525]"
        >
          <FileText size={18} strokeWidth={1.75} aria-hidden="true" />
          Resume
        </a>

        <a
          href="#contact"
          className="flex items-center gap-2 rounded-full bg-[#1c1c1c] px-6 py-3 text-sm font-medium uppercase tracking-wide text-zinc-100 transition-colors hover:bg-[#252525]"
        >
          <Mail size={18} strokeWidth={1.75} aria-hidden="true" />
          Contact
        </a>

        <a
          href="/cv.pdf"
          className="flex items-center gap-2 rounded-full bg-[#1c1c1c] px-6 py-3 text-sm font-medium uppercase tracking-wide text-zinc-100 transition-colors hover:bg-[#252525]"
        >
          <ScrollText size={18} strokeWidth={1.75} aria-hidden="true" />
          CV
        </a>
      </div>
    </section>
  );
}
