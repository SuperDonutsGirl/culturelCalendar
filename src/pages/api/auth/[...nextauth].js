import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Recherche l'utilisateur par email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && (await compare(credentials.password, user.password))) {
          // Si l'utilisateur est trouvé et que le mot de passe correspond
          return { id: user.id, name: user.name, email: user.email };
        }
        // Sinon, renvoie null (échec de l'authentification)
        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('User:', user); // Pour débogage
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
    console.log('Token callback:', token); // Pour débogage

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
