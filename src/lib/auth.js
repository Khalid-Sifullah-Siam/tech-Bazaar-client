import dns from "node:dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]);
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
export const db = client.db("tech-bazaar");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        defaultValue: "buyer",
      },
      plan: {
        defaultValue: "free",
        input: false,
      },
      status: {
        defaultValue: "active",
        input: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => ({
          data: {
            ...user,
            role: user.role === "seller" ? "seller" : "buyer",
            plan: "free",
            status: "active",
          },
        }),
      },
    },
  },
  // session: {
  //   cookieCache: {
  //     enabled: true,
  //     strategy: "jwt",
  //     maxAge: 60 * 24 * 60,
  //   },
  // },
  // plugins: [jwt()],
});
