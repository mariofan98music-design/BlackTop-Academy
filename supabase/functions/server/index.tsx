import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use('*', logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.get("/make-server-7703ec9d/health", (c) => c.json({ status: "ok" }));

// ── helpers ──────────────────────────────────────────────────────────────────

async function randomToken() {
  const buf = new Uint8Array(32);
  crypto.getRandomValues(buf);
  return Array.from(buf).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function getSession(token: string): Promise<string | null> {
  const session = await kv.get(`session:${token}`);
  if (!session) return null;
  if (Date.now() > session.expires) {
    await kv.del(`session:${token}`);
    return null;
  }
  return session.id;
}

async function requireAuth(c: any): Promise<string | null> {
  const auth = c.req.header("Authorization") ?? "";
  const token = auth.replace("Bearer ", "").trim();
  if (!token) return null;
  return getSession(token);
}

// ── auth ─────────────────────────────────────────────────────────────────────

// POST /login  { id, password }
app.post("/make-server-7703ec9d/login", async (c) => {
  const { id, password } = await c.req.json();
  if (!id || !password) return c.json({ error: "Missing fields" }, 400);

  const stored = await kv.get(`password:${id}`);
  // Default password = member's id (e.g. "jadyn") until they change it
  const expected = stored?.password ?? id;

  if (password !== expected) return c.json({ error: "Incorrect password" }, 401);

  const token = await randomToken();
  await kv.set(`session:${token}`, {
    id,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  return c.json({ token, id });
});

// POST /logout
app.post("/make-server-7703ec9d/logout", async (c) => {
  const auth = c.req.header("Authorization") ?? "";
  const token = auth.replace("Bearer ", "").trim();
  if (token) await kv.del(`session:${token}`);
  return c.json({ ok: true });
});

// POST /change-password  { currentPassword, newPassword }
app.post("/make-server-7703ec9d/change-password", async (c) => {
  const memberId = await requireAuth(c);
  if (!memberId) return c.json({ error: "Unauthorized" }, 401);

  const { currentPassword, newPassword } = await c.req.json();
  const stored = await kv.get(`password:${memberId}`);
  const expected = stored?.password ?? memberId;

  if (currentPassword !== expected) return c.json({ error: "Current password is incorrect" }, 401);
  if (!newPassword || newPassword.length < 4) return c.json({ error: "New password too short" }, 400);

  await kv.set(`password:${memberId}`, { password: newPassword });
  return c.json({ ok: true });
});

// ── profiles ──────────────────────────────────────────────────────────────────

// GET /profile/:id
app.get("/make-server-7703ec9d/profile/:id", async (c) => {
  const id = c.req.param("id");
  const profile = await kv.get(`profile:${id}`);
  return c.json(profile ?? {});
});

// PUT /profile/:id  — requires auth, can only edit own profile
app.put("/make-server-7703ec9d/profile/:id", async (c) => {
  const memberId = await requireAuth(c);
  if (!memberId) return c.json({ error: "Unauthorized" }, 401);

  const id = c.req.param("id");
  if (memberId !== id) return c.json({ error: "Forbidden" }, 403);

  const body = await c.req.json();
  // Only allow safe fields
  const allowed = ["bio", "goals", "platform", "photoUrl", "socials", "displayName"];
  const update: Record<string, any> = {};
  for (const key of allowed) {
    if (key in body) update[key] = body[key];
  }

  const existing = await kv.get(`profile:${id}`) ?? {};
  await kv.set(`profile:${id}`, { ...existing, ...update });
  return c.json({ ok: true });
});

Deno.serve(app.fetch);
