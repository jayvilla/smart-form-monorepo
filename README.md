# 🚀 SmartForm Monorepo

Dynamic form engine powered by **Next.js**, **NestJS**, and **Zod** — built with a modern **pnpm + Turborepo** monorepo architecture.

## ✨ Overview

SmartForm is a dynamic form system that uses **Zod schemas** to generate UI automatically on the frontend and validate the same schema on the backend.  
This ensures **100% consistent validation** and eliminates duplication.

This project includes:

- **Next.js 14** frontend with TailwindCSS
- **NestJS 10** backend API
- **Shared Zod schema package** (`@smart/schemas`)
- **pnpm workspaces** + Turborepo task pipeline
- **Full client + server validation pipeline**

---

## 🧱 Monorepo Structure

smart-form-monorepo/
├── apps/
│ ├── web/ # Next.js frontend
│ └── api/ # NestJS backend
├── packages/
│ └── schemas/ # Shared Zod schemas
├── pnpm-workspace.yaml
├── turbo.json
└── package.json

---

## 📦 Tech Stack

### Frontend (apps/web)

- Next.js 14 (App Router)
- React 18
- TailwindCSS
- Dynamic form renderer

### Backend (apps/api)

- NestJS 10
- Zod Validation Pipe
- Shared schema validation

### Shared Package (packages/schemas)

- Zod 3.x
- TypeScript
- Build output consumed by both app & api

### Tooling

- pnpm workspace
- Turborepo
- TypeScript
- tsc builds

---

## 🚀 Getting Started

### 1. Install Dependencies (from repo root)

```bash
pnpm install
```

### 2. Build shared Zod schemas

```bash
pnpm --filter @smart/schemas build
```

### 3. Start the backend (NestJS)

```bash
pnpm --filter @smart/schemas build
```

Runs at:

```bash
http://localhost:8000
```

### 4. Start the frontend (Next.js)

```bash
pnpm --filter web dev
```

Runs at:

```bash
http://localhost:3000
```

## 🔗 API Routes (NestJS)

### **POST `/user-form`**

Validates form submissions using **ZodValidationPipe**.

- Uses `UserFormSchema` from `@smart/schemas`
- Returns **400** with structured errors on validation failure
- Returns validated data on success

#### Example Success Response

```json
{
  "message": "User form submitted successfully",
  "data": { ... }
}
```

#### Example Error Response

```json
{
  "message": "Validation failed",
  "errors": [{ "path": "email", "message": "Invalid email" }]
}
```
