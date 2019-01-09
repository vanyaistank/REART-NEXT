import { Request, Response } from 'express';
import * as DataLoader from 'dataloader';
import { User } from '../entity/User';

export type decodedTokenType = {
	decodedToken?: string;
}

export interface MyContext {
	req: Request & decodedTokenType
	res: Response
	userLoader: DataLoader<string, User>;
}