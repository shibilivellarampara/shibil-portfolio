# Shibil Muhamed V — Portfolio

Personal portfolio for a Senior Java Backend / Distributed Systems engineer: experience, architecture case studies, skills, playable games, and contact.

Built with React, TypeScript, Vite, Tailwind CSS v4, Framer Motion, and Lucide icons. Inter and JetBrains Mono are self-hosted via Fontsource.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # type-check + production build
npm run lint
npm run preview   # serve the production build locally
```

## Structure

```
src/
  data/portfolio.ts        All content: profile, experience, projects, games, skills
  components/
    Nav, Hero, Experience, Projects, Skills, Playground, Education, Contact, Footer
    terminal/              Interactive CLI widget (commands, jq filters, health check)
    ui/                    Shared primitives (Container, Reveal, Tag, ButtonLink, ...)
  hooks/useCopy.ts         Clipboard helper for the contact card
```

## Content

Everything on the page is driven by `src/data/portfolio.ts`: edit it to change copy, metrics, links, or to add a project or game. The CV is served from `public/cv/`; `profile.resumeUrl` points at it.

## The terminal widget

The hero terminal runs `shibil --status` and a health check on load, then accepts input (`help` lists commands). The health check is real where it can be: `uptime` is time since the page opened, and `latencyMs` is a measured round trip to this site's own origin. Supported pipes are `| jq`, `| jq -r`, and dot-path filters such as `.components.postgres`.

## Theme

Dark is the default. The navbar toggle switches to a light theme and remembers the choice. Colors are CSS variables defined in `src/index.css`; the terminal stays dark in both themes.
