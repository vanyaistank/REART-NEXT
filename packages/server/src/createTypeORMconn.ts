import { createConnection } from 'typeorm';
// import config from '../ormconfig.json';

const createTypeORMconn = async () => {
	let retries = 5;
	while (retries) {
		try {
			return createConnection({
				type: "postgres",
				host: "localhost",
				port: 5432,
				username: "postgres",
				password: "root",
				database: "re-art",
				entities: [
					__dirname + "/entity/*.ts"
				],
				migrations: [
					__dirname + "/migration/*.ts"
				],
				subscribers: [
					__dirname + "/subscriber/*.ts"
				],
				synchronize: true,
			});
		} catch (err) {
			console.log(err);
			retries -= 1;
			console.log(`retries left: ${retries}`);
			// wait 5 seconds
			await new Promise(res => setTimeout(res, 5000));
		}
	}

	return null;
};

export default createTypeORMconn;