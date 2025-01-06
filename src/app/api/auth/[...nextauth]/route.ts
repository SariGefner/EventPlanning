import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDb from '../../../lib/db/connectDb';
import { UserModel } from '../../../lib/models/user';
import { cookies } from 'next/headers';
import { generateToken, setAuthCookies } from '@/middlewares/authMiddleware';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await connectDb();

      try {
        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          throw new Error('User not found');
        }

        const token = generateToken({
          userName: existingUser.userName,
          email: existingUser.email,
        });

        const cookieStore = cookies();
        setAuthCookies(
          { cookies: cookieStore },
          existingUser.userName,
          token
        );

        return true;
      } catch (error) {
        console.error("User validation error:", error);
        return `/pages/user-account/auth/new-user-error?error=UserNotFound`;
      }
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || '';
        await connectDb();
        const dbUser = await UserModel.findOne({ email: session.user.email });

        if (dbUser) {
          session.user.userName = dbUser.userName;
          session.user.email = dbUser.email;
        }
      }
      return session;
    },

    async redirect() {
      // Redirect to /user-account after sign-in
      return `/pages/user-account`;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
