import React, { PureComponent, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Button } from '@Components';
import { uploadFiles } from './uploadSchema';

class Upload extends PureComponent<any, any> {
	state = {
		files: [],
	};

	addFile = (file: FileList) => {
		console.log(file, 'file????');
		this.setState(state => ({
			...state,
			files: [
				...state.files,
				// @ts-ignore
				...file,
			],
		}));
	}

	render() {
		const { files } = this.state;
		console.log(files, 'files in state');
		return (
			<Mutation mutation={uploadFiles}>
				{uploadFiles => (
					<Fragment>
						<input
							type="file"
							required
							multiple
							onChange={({ target: { validity, files } }) => {
								if (validity.valid) {
									this.addFile(files);
								}
							}}
						/>
						<Button onClick={() => uploadFiles({ variables: { files } })}>
							UPLOAD
						</Button>
					</Fragment>
				)}
			</Mutation>
		);
	}
}

export default Upload;
