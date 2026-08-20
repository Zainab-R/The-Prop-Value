import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Throws if the current request isn't from a logged-in ADMIN.
 * Use at the top of every admin Server Action / route handler that
 * mutates data — Server Actions are independently callable HTTP
 * endpoints, so the UI-level redirect in app/admin/layout.tsx is not
 * sufficient authorization on its own.
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (!session?.user || role !== "ADMIN") {
    throw new Error("Unauthorized: admin access required.");
  }

  return session;
}

/**
 * Throws if the current request isn't from a logged-in user, and
 * returns that user's database record.
 */
export async function requireUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized: you must be logged in.");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("Unauthorized: user not found.");
  }

  return user;
}
