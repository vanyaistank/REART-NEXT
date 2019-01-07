import "reflect-metadata";
import * as http from 'http';
require("dotenv-safe").config();
import { ApolloServer, ApolloError } from 'apollo-server-express';
import { v4 } from 'uuid';
import { GraphQLError } from 'graphql';
import { buildSchema } from "type-graphql";
import * as cors from 'cors';
import * as express from 'express';
import * as session from "express-session";
import chalk from 'chalk';

import createConnection from './createTypeORMconn';
import userLoader from './loaders/userLoader';
import {decodeToken} from './helpers/decodeToken';

const startServer = async () => {
    console.log(chalk.yellow('[*] Starting up server...'));

    process.stdout.write(
        chalk.yellow(`\t+ ${chalk.white('Creating database connection...')}`)
    );
    await createConnection();
    console.log(chalk.green.bold('DONE'));

    process.stdout.write(
        chalk.yellow(`\t+ ${chalk.white('Creating express app...')}`)
    );
    const app = express();

    let schema;

    try {
        process.stdout.write(
            chalk.yellow(`\t+ ${chalk.white("Building schema...")}`)
        );
        schema = await buildSchema({
            resolvers: [__dirname + "/modules/**/Resolver.*"],
            authChecker: async ({ context }) => {
                const token =
                    context.req &&
                    context.req.headers &&
                    context.req.headers.Authorization ||
                    context.connAuth
                    || '';

                const decodedToken = await decodeToken(token);

                if (!decodedToken) {
                    return false
                }

                // @ts-ignore
                const { id, secret } = decodedToken;
                const user = await context.userLoader.load(id);

                if (user.accessSecret !== secret) {
                    return false
                }

                context.userId = id
                return true
            },
            validate: false,
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }

    process.stdout.write(
        chalk.yellow(`\t+ ${chalk.white('Creating apollo server instance...')}`)
    );
    // TODO: use redis PubSub
    const server = new ApolloServer ({
        schema,
        // @ts-ignore
        context: ({ req, res }: any) => ({
            userLoader: userLoader(),
            req,
            res,
        }),
        formatError: (error: GraphQLError) => {
            if (error.originalError instanceof ApolloError || process.env.NODE_ENV === 'development') {
                return error;
            }

            const errId = v4();
            console.log(`errId: ${errId}`);
            console.log(error);

            return new GraphQLError(`Internal Error: ${errId}`);
        },
    });
    console.log(chalk.green.bold('DONE'));

    process.stdout.write(chalk.yellow(`\t+ ${chalk.white('Using cors...')}`));
    app.use(
        cors({
            credentials: true,
            origin:
                process.env.NODE_ENV === "production"
                    ? "http://re-art.store"
                    : `http://localhost:${process.env.PORT || 7080}`,
        })
    );
    console.log(chalk.green.bold('DONE'));

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

    if (!process.env.SESSION_SECRET) {
        throw Error('SESSION_SECRET is missing, check your .env');
    }

    process.stdout.write(chalk.yellow(`\t+ ${chalk.white('Using session...')}`));
    app.use(
        // TODO: use redis as a store
        session({
            name: "qid",
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
            },
        } as any)
    );
    console.log(chalk.green.bold('DONE'));

    process.stdout.write(
        chalk.yellow(
            `\t+ ${chalk.white('Applying middleware to ApolloServer...')}`
        )
    );
    server.applyMiddleware({ app, cors: false }); // app is from an existing express app

    process.stdout.write(
        chalk.yellow(
            `\t+ ${chalk.white('Creating http server and installing subscription handlers...')}`
        )
    );
    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);
    console.log(chalk.green.bold('DONE'));

    process.stdout.write(chalk.yellow(`\t+ ${chalk.white('Finishing...')}`));

    const port = process.env.PORT || 7080;
    // pay attention to the fact that we are calling `listen` on the http server
    httpServer.listen(
        { port }, () => {
            console.log(chalk.yellow(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
            console.log(chalk.yellow(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`));
        }
    );
};

startServer();