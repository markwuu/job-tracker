import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from "next-auth/adapters"
import Models from "../../../models"

const options = {
    providers: [
        Providers.GitHub({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET
        }),
        Providers.Google({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET
        }),
        Providers.Email({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM,
        })
    ],
    database: process.env.MONGODB_URL,
    callbacks: {
      session: async (session, user) => {
        session.userId = user.id;
        return Promise.resolve(session);
      }
    },
    adapter: Adapters.TypeORM.Adapter(
      // The first argument should be a database connection string or TypeORM config object
      process.env.MONGODB_URL,
      // The second argument can be used to pass custom models and schemas
      {
        models: {
          User: Models.User,
        },
      }
    ),
}

export default (req, res) => NextAuth(req, res, options);
