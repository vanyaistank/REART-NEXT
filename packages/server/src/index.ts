import "reflect-metadata";
import { ApolloServer  } from 'apollo-server-express';
import { buildSchema } from "type-graphql";
import * as cors from 'cors';
import * as express from 'express';
import * as session from "express-session";

import createConnection from './createTypeORMconn';

const startServer = async () => {
    await createConnection();

    const app = express();

    const SESSION_SECRET = "fdashjfhdsajfhds"; // TODO: .env
    let schema;

    try {
        schema = await buildSchema({
            resolvers: [__dirname + "/modules/**/Resolver.*"],
            authChecker: ({ context }) => {
                return context.req.session && context.req.session.userId; // or false if access denied
            },
            validate: false,
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }

    const server = new ApolloServer ({
        schema,
        // @ts-ignore
        context: ({ request }) => ({
            req: request
        }),
    });

    app.use(
        cors({
            credentials: true,
            origin:
                process.env.NODE_ENV === "production"
                    ? "http://re-art.store"
                    : "http://localhost:7080",
        })
    );

    app.use((req, _, next) => {
        const authorization = req.headers.authorization;

        if (authorization) {
            try {
                const qid = authorization.split(" ")[1];
                req.headers.cookie = `qid=${qid}`;
            } catch (_) {}
        }

        return next();
    });

    app.use(
        // TODO: use redis as a store
        session({
            name: "qid",
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
            },
        } as any)
    );

    server.applyMiddleware({ app, cors: false }); // app is from an existing express app

    const port = 7080; // TODO: .env
    app.listen(
        { port },
        () => console.log(`Server is running on http://localhost:${port}`)
    );
};

startServer();