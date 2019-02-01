import gql from 'graphql-tag';

export const uploadFiles = gql`
    mutation uploadFiles($files: [Upload!]!) {
        uploadFiles(files: $files) {
            success
	        message
	        data {
                id
                path
                filename
                mimetype
                encoding
	        }
        }
    }
`;
