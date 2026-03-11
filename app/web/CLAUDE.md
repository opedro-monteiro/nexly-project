# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a **Next.js 16** app using the App Router with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui** components.

### Route Structure

- `app/layout.tsx` — Root layout with `ThemeProvider` (dark mode default) and `TooltipProvider`
- `app/(private)/` — Route group for authenticated pages (currently has `dashboard/`)
- `app/page.tsx` — Public root page

### Key Patterns

- **UI components**: shadcn/ui components live in `components/ui/`. Add new ones via `npx shadcn add <component>`.
- **Providers**: `components/providers/theme-provider.tsx` wraps `next-themes`. All providers are composed in the root layout.
- **Utilities**: `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) for conditional class merging.
- **Hooks**: `hooks/use-mobile.ts` for responsive detection.
- **Fonts**: DM Sans (sans) and Geist Mono (mono), configured as CSS variables `--font-sans` and `--font-geist-mono`.
- **Language**: UI is in Brazilian Portuguese (`lang="pt-br"`).

### Component Architecture

The sidebar (`components/app-sidebar.tsx`) is a client component composing shadcn sidebar primitives with `NavUser`, `DatePicker`, and `Calendars` sub-components. The `(private)` layout uses a `LayoutProps` generic typed by route path.
