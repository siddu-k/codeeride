import NextAuth, { AuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"

export const authOptions: AuthOptions = {
    providers: [
        ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? [
            GitHubProvider({
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                authorization: {
                    params: {
                        scope: "read:user user:email repo"
                    }
                }
            })
        ] : [])
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            // Always allow sign in if GitHub is configured
            return true;
        },
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token }) {
            // Send access token to the client session
            if (token.accessToken) {
                (session as any).accessToken = token.accessToken;
            }
            return session
        },
        async redirect({ url, baseUrl }) {
            // Redirect to IDE page after successful login
            if (url.startsWith(baseUrl)) return url
            return `${baseUrl}/ide`
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
