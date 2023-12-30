import { connectToDatabase } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import User from "@models/user";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session?.user?.email });
      const userId = sessionUser?._id?.toString();
      return {
        ...session,
        user: {
          ...session.user,
          id: userId,
        },
      };
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDatabase();

        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: user?.email,
            username: user?.name?.replace(" ", "").toLowerCase(),
            image: user?.picture,
          });
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
