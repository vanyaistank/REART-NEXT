import { InputType, ObjectType, Field, Resolver, Mutation, Arg } from 'type-graphql';
import { GraphQLUpload } from 'apollo-server-express';
import FileUploadService from './FileUploadService';

@ObjectType()
export class File {
	@Field()
	id: string;

	@Field()
	path: string;

	@Field()
	filename: string;

	@Field()
	mimetype: string;

	@Field()
	encoding: string;
}

// TODO: create util function for response
@ObjectType()
class FileUploadResponse {
	@Field()
	success: boolean;

	@Field()
	message: string;

	@Field(() => [File])
	data: [File];
}

@InputType()
export class FileInput {
	@Field()
	stream: string;

	@Field()
	filename: string;

	@Field()
	mimetype: string;

	@Field()
	encoding: string;
}

@Resolver(File)
export class FileUploadResolver {
	@Mutation(() => FileUploadResponse)
	async uploadFiles(
		@Arg('files', () => [GraphQLUpload]) files: [FileInput],
	) {
		try {
			const uploadedFiles = await Promise.all(files.map(FileUploadService.processUpload));
			console.log(uploadedFiles, 'uploadedFILES???');
			return FileUploadService.createSuccessResponse(uploadedFiles);
		} catch (e) {
			return FileUploadService.createErrorResponse(e);
		}
	}
}
