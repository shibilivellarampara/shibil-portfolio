import { ArrowUpRight, Check, Copy, Mail, Phone } from "lucide-react";
import { profile } from "../data/portfolio";
import { useCopy } from "../hooks/useCopy";
import Section from "./Section";
import ButtonLink from "./ui/ButtonLink";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";
import Reveal from "./ui/Reveal";

const channels = [
  {
    href: profile.social.github,
    label: "GitHub",
    handle: "shibilivellarampara",
    icon: GithubIcon,
  },
  {
    href: profile.social.linkedin,
    label: "LinkedIn",
    handle: "shibil-muhamed-v",
    icon: LinkedinIcon,
  },
  {
    href: `tel:${profile.phone}`,
    label: "Phone",
    handle: profile.phone,
    icon: Phone,
  },
];

export default function Contact() {
  const { status, copy } = useCopy();

  return (
    <Section
      id="contact"
      index="06"
      eyebrow="contact"
      title="Let's build something reliable"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-card p-6 sm:p-10">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="bg-dots absolute inset-0 opacity-60" />
            <div className="bg-glow absolute inset-0" />
          </div>

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="max-w-lg text-lg leading-relaxed text-ink">
                Hiring for a senior backend role, or have a system that needs
                to scale?
              </p>
              <p className="mt-3 max-w-lg leading-relaxed text-muted">
                I&apos;m open to conversations. Email is the fastest way to
                reach me.
              </p>

              <p className="mt-6 break-all font-mono text-sm text-accent">
                {profile.email}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <ButtonLink href={`mailto:${profile.email}`} variant="primary">
                  <Mail size={16} aria-hidden /> Send an email
                </ButtonLink>
                <button
                  type="button"
                  onClick={() => void copy(profile.email)}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/60 hover:text-accent"
                >
                  {status === "copied" ? (
                    <Check size={16} className="text-accent" aria-hidden />
                  ) : (
                    <Copy size={16} aria-hidden />
                  )}
                  <span aria-live="polite">
                    {status === "copied"
                      ? "Copied!"
                      : status === "error"
                        ? "Copy failed"
                        : "Copy email"}
                  </span>
                </button>
              </div>
            </div>

            <ul className="space-y-3">
              {channels.map(({ href, label, handle, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-canvas/60 px-4 py-3.5 transition-colors hover:border-accent/60"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <Icon size={18} className="shrink-0 text-muted transition-colors group-hover:text-accent" />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-ink">
                          {label}
                        </span>
                        <span className="block truncate font-mono text-xs text-muted">
                          {handle}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-muted transition-colors group-hover:text-accent"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
