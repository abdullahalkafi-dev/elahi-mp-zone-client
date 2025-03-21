import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";
import { NextAuthOptions } from "next-auth";
import axios from "axios";
import { cookies } from "next/headers";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    signIn: async ({ profile, account }: any) => {
      console.log("Social login ==>", profile, account);
      if (!profile || !account) {
        return false;
      }
      if (account.provider === "google") {
        console.log(`ddd
          dd
          ddd`,profile,
        `dd
        ddd
        
        dd`);

        const userProfile = {
          name: profile?.name,
          image: profile?.picture,
          email: profile?.email,
          googleId: profile?.sub,
        };
        try {
          const response = await axios.post(
            "http://localhost:5001/api/v1/user/google-auth",
            userProfile
          );

          if (response.data.data.accessToken) {
            cookies().set("accessToken", response.data.data.accessToken);
          }
        } catch (error) {
          console.error("Error posting to backend:", error);
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/signup",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  debug: true,
};
