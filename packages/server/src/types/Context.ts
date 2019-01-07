import { Request, Response } from 'express';
import * as DataLoader from 'dataloader';
import { User } from '../entity/User';

export interface MyContext {
	req: Request
	res: Response
	userLoader: DataLoader<string, User>;
}