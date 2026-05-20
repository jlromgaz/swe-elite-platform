# Top 1% SWE Elite Platform

Self-hosted learning platform for software engineers aspiring to reach the top 1% of the industry. Provides a guided, adaptive roadmap from fundamentals to elite-level engineering — driven by solid foundations and real projects, not shortcuts.

## What It Does

- **Adaptive Roadmap** — Interactive DAG (React Flow) that unlocks topics based on dependency graph progress and personal deadlines
- **Deep Onboarding** — Honest skill assessment that sets your starting point and calculates remaining days to your goal
- **Microlearning Hub** — Spaced repetition pills (3 / 7 / 30 day intervals) for long-term retention
- **Validation Engine** — Proof-of-work challenges (quizzes, tradeoff analysis) to mark topics as mastered
- **Capstone Projects** — Iterative real-product projects instead of isolated exercises

## Architecture

```
User Input (Onboarding)
      │
      ▼
UserProfile (SQLite) ◄── Roadmap Engine (static JSON decision trees)
      │                         │
      ▼                         ▼
NodeProgress (SQLite)     Topic DAG (seeded data)
      │
      └── Validation Engine ──► PillReview (SRS)
```

**Key decisions:**

| Decision | Choice | Rationale |
|---|---|---|
| Runtime | No LLM APIs in v1.0 | Self-hosted, zero latency, no privacy leak |
| ORM | Prisma | Safe migrations, strong type generation for complex schema |
| Visualization | React Flow | Interactive DAG for adaptive roadmap |
| Database | SQLite via Prisma | Zero-config, single file, perfect for local-first |
| CSS | Tailwind | Utility-first fits component library approach |
| Testing | Vitest | Native ESM, fast cold start, Next.js ecosystem aligned |

## Tech Stack

- **Framework:** Next.js 14 (App Router, Server Components)
- **Database:** SQLite + Prisma
- **Visualization:** @xyflow/react (React Flow) + @dagrejs/dagre (auto-layout)
- **Styling:** Tailwind CSS
- **Testing:** Vitest
- **Infrastructure:** Docker (single container)

## Quick Start

```bash
# Clone and run
git clone https://github.com/jlromgaz/swe-elite-platform.git
cd swe-elite-platform
docker compose up -d

# App available at http://localhost:3000
```

The container automatically:
1. Pushes the Prisma schema to SQLite
2. Seeds foundational topics and pills
3. Starts the Next.js server

### Local Development (without Docker)

```bash
npm install

# Setup database
cd packages/db
npx prisma db push
npx prisma generate
npx prisma db seed
cd ../..

# Run dev server
npm run dev
```

## Project Structure

```
swe-elite-platform/
├── apps/
│   └── web/                    # Next.js App Router
│       ├── app/
│       │   ├── (onboarding)/   # Onboarding wizard
│       │   ├── (dashboard)/   # Roadmap, pills, validation pages
│       │   └── api/           # API routes
│       ├── Dockerfile
│       └── package.json
├── packages/
│   ├── db/                    # Prisma schema, client, seed data
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── seed.ts
│   │   └── src/
│   └── ui/                    # Shared UI components (NodeCard, PillCard, etc.)
├── scripts/
│   └── start.sh               # Docker entrypoint (db push → seed → start)
├── docker-compose.yml
└── package.json               # NPM workspaces root
```

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/health` | Liveness check |
| `POST` | `/api/onboarding` | Create user profile, seed node progress |
| `GET` | `/api/roadmap` | User's full DAG topics + states |
| `POST` | `/api/roadmap/[topicId]/start` | Transition topic to in_progress |
| `POST` | `/api/roadmap/[topicId]/complete` | Master topic + unlock dependents |
| `GET` | `/api/pills/due` | Pills due for SRS review today |
| `POST` | `/api/pills/[pillId]/review` | Submit SRS review score |
| `GET` | `/api/validations/[topicId]` | Get validation challenge |
| `POST` | `/api/validations/[topicId]/submit` | Score validation attempt |

## Data Model

The `User` stores `targetDays` — automatically calculated from the `goalDeadline` date during onboarding. No manual month input needed; the system computes remaining days from the current date.

## Testing

```bash
# Run all tests
npm test

# Run a specific package
cd packages/db && npm test
cd apps/web && npm test
```

## Content Contribution

Content (resources, pills, validations) is seeded via `packages/db/prisma/seed.ts`. To add new topics or resources:

1. Edit `seed.ts` with your additions
2. Run `npx prisma db seed`
3. Submit a PR

## License

MIT