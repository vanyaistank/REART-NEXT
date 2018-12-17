import axios, { AxiosInstance } from 'axios';
import bunyan from 'bunyan';

const logger = bunyan.createLogger({ name: 'RE-ART' });

type RequestOptions = {
	method?: string;
	url: string;
	headers?: object;
	params?: object;
	body?: object;
};

export default class Api {
	private readonly headers: {};
	private readonly baseURL: string;
	private instance: AxiosInstance;

	constructor(baseURL) {
		this.headers = {};

		this.baseURL = baseURL;
		// this.token = token;

		this.instance = axios.create({
			baseURL,
			timeout: 10000,
		});
	}

	request(opts: RequestOptions) {
		let options;
		if (opts) {
			options = {
				...opts,
				headers: {
					...this.headers,
					...opts.headers,
				},
				method: opts.method || 'get',
			};
		} else {
			options = {
				url: `${this.baseURL}/`,
				method: 'get',
			};
		}
		logger.info(this.baseURL, options, 'requestLog');

		return this.instance({
			...options,
		})
			.then(response => {
				logger.info(response.data, 'responseLog');
				return response.data;
			})
			.catch(error => {
				logger.warn(error.request, error.message, 'requestErrorLog');
				if (/timeout/i.test(error.message)) {
					console.error(error.message, 'timeout!');
				}

				throw Error(JSON.stringify(error.response.data));
			});
	}
}
