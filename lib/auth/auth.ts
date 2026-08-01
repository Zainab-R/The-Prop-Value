import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid email or password");
        }

       return {
  id: user.id,
  name: user.name,
  email: user.email,
  image: user.image,
  role: user.role,
} as any;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
     if (user) {
  token.id = (user as any).id;
}

if (token.email) {
  const dbUser = await prisma.user.findUnique({
    where: {
      email: token.email,
    },
  });

  if (dbUser) {
    token.name = dbUser.name;
    token.email = dbUser.email;
    token.picture = dbUser.image;
    (token as any).role = dbUser.role;
  }
}

      return token;
    },

    async session({ session, token }) {
     if (session.user) {
  (session.user as any).id = token.id;
  (session.user as any).role = (token as any).role;

  session.user.name = token.name;
  session.user.email = token.email;
  session.user.image = token.picture as string | null;
}

      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};