import * as jwt from 'jsonwebtoken';

export const decodeToken = async (token: string): Promise<any> => {
	if (!process.env.JWT_SECRET) {
		throw Error('JWT_SECRET is missing, check ur .env');
	}

	let decodedToken = null;

	try {
		decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		console.error(e);
	}
	console.log(decodedToken, 'decodedToken');

	return decodedToken;
};
