import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


const prisma = new PrismaClient();


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    secret: process.env.NEXTAUTH_CRECRET,
    adapter: PrismaAdapter(prisma),
    callbacks:{
        session:({session, user}) =>({
            ...session,
            user: {
                ...session.user,
                id: user.id,
                username: user.username,    
            }
        })
    }
}

export default NextAuth(authOptions);

