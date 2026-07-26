import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8 px-6">
      <div className="mx-auto max-w-5xl flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Built with React, Tailwind &amp; Three.js</p>
      </div>
    </footer>
  );
}
