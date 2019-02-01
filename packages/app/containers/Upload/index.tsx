import React, { PureComponent, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { Button } from '@Components';
import { colors } from '@Styled/theme';
import { uploadFiles } from './uploadSchema';

interface FileWithPreview extends File {
	preview: string;
}

interface State {
	files: FileWithPreview[];
}

const Container = styled.div`
  width: 200px;
  height: 200px;
  border-width: 2px;
  border-radius: 5px;
  border-color: ${colors.border};
  border-style: ${'dashed'};
  background-color: ${colors.main};
`;

class Upload extends PureComponent<any, State> {
	state = {
		files: [],
	};

	onDrop = (accepted: FileWithPreview[], rejected: FileWithPreview[]) => {
		console.log(accepted, rejected, 'file????');

		if (rejected.length) {
			// TODO: trigger notification or whatever
			console.log('these files are rejected man....', rejected);
		}

		this.setState((state) => {
			const acceptedFiles = [...accepted].map((file) => {
				file.preview = URL.createObjectURL(file);
				return file;
			});

			return {
				...state,
				files: [
					...state.files,
					...acceptedFiles,
				],
			};
		});
	}

	renderPreview = () =>
		this.state.files.map(file => (
			<img src={file.preview} key={file.id} />
		))

	componentWillUnmount() {
		// Make sure to revoke the data uris to avoid memory leaks
		this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
	}

	render() {
		const { files } = this.state;
		console.log(files, 'files in state');
		return (
			<Mutation mutation={uploadFiles}>
				{uploadFiles => (
					<Fragment>
						<Dropzone
							accept="image/jpeg, image/png"
							onDrop={this.onDrop}
							maxSize={1e+7}
						>
							{({ getRootProps, getInputProps }) => (
								<Container {...getRootProps()}>
									<input
										{...getInputProps()}
									/>
								</Container>
							)}
						</Dropzone>
						{this.renderPreview()}
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
