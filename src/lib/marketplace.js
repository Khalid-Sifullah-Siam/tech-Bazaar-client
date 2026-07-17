import { auth } from "@/lib/auth";
import Stripe from "stripe";

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY is not configured");
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function getCurrentUser(request) {
  const session = await auth.api.getSession({ headers: request.headers });
  return session?.user || null;
}

export async function requireUser(request, roles = []) {
  const user = await getCurrentUser(request);
  if (!user) throw new Response("Unauthorized", { status: 401 });
  if (["blocked", "suspended"].includes(user.status)) {
    throw new Response(`Account ${user.status}`, { status: 403 });
  }
  if (roles.length && !roles.includes(user.role)) {
    throw new Response("Forbidden", { status: 403 });
  }
  return user;
}

export function jsonError(error) {
  if (error instanceof Response) return error;
  console.error(error);
  return Response.json({ message: error.message || "Server error" }, { status: 500 });
}

export function publicUrl(request) {
  return process.env.BETTER_AUTH_URL || new URL(request.url).origin;
}

export function serialize(value) {
  return JSON.parse(JSON.stringify(value));
}
