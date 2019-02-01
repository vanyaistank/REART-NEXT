import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as shortid from 'shortid';
import { File, FileInput } from './Resolver';

type UploadResolve = {
	id: string;
	path: string;
};

export default class FileUploadService {
	private static async storeUpload({ stream, filename }: any): Promise<UploadResolve> {
		const id = shortid.generate();
		const dir = path.resolve(`${process.env.UPLOAD_PATH}/${id}-${filename}`);

		return new Promise((resolve, reject) =>
			stream
				.on('error', (error: Error) => {
					if (stream.truncated) {
						// Delete the truncated file.
						fs.unlinkSync(dir);
						reject(error);
					}
				})
				.pipe(fs.createWriteStream(dir))
				.on('finish', () => resolve({ id, path: dir }))
				.on('error', reject),
		);
	}

	public static async processUpload(upload: FileInput) {
		// Ensure upload directory exists
		mkdirp.sync(process.env.UPLOAD_PATH || './uploads');

		const {
			stream,
			filename,
			mimetype,
			encoding,
		} = await upload;

		const { id, path } = await FileUploadService.storeUpload({ stream, filename });
		return {
			id,
			path,
			filename,
			mimetype,
			encoding,
		};
	}

	public static createSuccessResponse(files: File[]) {
		return {
			data: files,
			success: true,
			message: '',
		};
	}

	public static createErrorResponse(error: Error) {
		console.log(error);
		return {
			success: false,
			message: error.message,
			files: [],
		};
	}
}
