import "reflect-metadata";
import * as http from 'http';
require("dotenv-safe").config();
import { ApolloServer, ApolloError } from 'apollo-server-express';
import { v4 } from 'uuid';
import { GraphQLError } from 'graphql';
import { buildSchema } from "type-graphql";
import * as cors from 'cors';
import * as express from 'express';
import chalk from 'chalk';

import createConnection from './createTypeORMconn';
import userLoader from './loaders/userLoader';
import { decodeToken } from './helpers/decodeToken';

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
                console.log(context, 'context.req');
                if (context.req) {
                    console.log(context.req.decodedToken, context.req.token, 'session???');
                    return !!(context.req.decodedToken || context.req.token);
                }
                return false;
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
        subscriptions: {
            onConnect: (connectionParams: any) => {
                return {
                    authorization: connectionParams.authorization || null
                }
            }
        }
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

    app.use(async (req, _, next) => {
        const authorization = req.headers.authorization;
        console.log(authorization, 'authorization?????????');
        if (authorization && typeof(authorization) === 'string') {
            const bearer: string[] = authorization.split(' ');

            if (
                bearer.length === 2 &&
                bearer[0].toLowerCase() === 'bearer'
            ) {
                const token = bearer[1];
                const decodedToken = await decodeToken(token);
                console.log(decodedToken, 'decodedToken!!!');
                if (decodedToken) {
                    // @ts-ignore
                    req.decodedToken = decodedToken;
                    // @ts-ignore
                    req.token = token;
                }
            }
        }

        return next();
    });

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