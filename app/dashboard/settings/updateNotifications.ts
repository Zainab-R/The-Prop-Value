"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface NotificationPreferences {
  notifyEmail: boolean;
  notifyEstimate: boolean;
  notifyMarket: boolean;
}

export async function getNotificationPreferences(): Promise<NotificationPreferences> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized.");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      notifyEmail: true,
      notifyEstimate: true,
      notifyMarket: true,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
}

export async function updateNotifications(
  preferences: NotificationPreferences
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized.");
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      notifyEmail: preferences.notifyEmail,
      notifyEstimate: preferences.notifyEstimate,
      notifyMarket: preferences.notifyMarket,
    },
  });

  revalidatePath("/dashboard/settings");

  return { success: true, message: "Notification preferences saved." };
}
