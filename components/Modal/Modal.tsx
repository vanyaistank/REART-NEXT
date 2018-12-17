import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import styled from 'styled-components';
import { media } from '@Styled/theme';

interface ModalContainerProps {
	showModal: boolean;
}

interface ModalProps {
	toggleModal: () => void;
	handleReset?: () => void; // reset formik form if Modal component is used in it
}

const ModalContainer = styled.div`
	display: ${(props: ModalContainerProps) =>
		(props.showModal ? 'flex' : 'none')};
	position: ${(props: ModalContainerProps) => props.showModal && 'fixed'};
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.3);
	z-index: 10;
	height: 100vh;
	opacity: ${(props: ModalContainerProps) => (props.showModal ? '1' : '0')};
	transition: 150ms opacity ease-in-out;
`;

const ModalWrapper = styled.div`
	padding: 20px;
	background: #fff;
	border-radius: 2px;
	display: inline-block;
	min-height: 500px;
	margin: 1rem;
	position: relative;
	min-width: 500px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	justify-self: center;
	${media.tablet`
		min-height: 300px;
		min-width: 300px;
	`};
`;

class Wrapper extends React.Component<ModalProps & ModalContainerProps> {
	handleClickOutside() {
		const { showModal, toggleModal, handleReset } = this.props;
		if (showModal) {
			if (handleReset) {
				handleReset();
			}
			return toggleModal();
		}
	}

	render() {
		const { children } = this.props;
		return <ModalWrapper>{children}</ModalWrapper>;
	}
}

const EnhancedWrapper = enhanceWithClickOutside(Wrapper);

const Modal = ({ toggleModal, showModal, handleReset, children }) => (
	<ModalContainer showModal={showModal}>
		<EnhancedWrapper
			handleReset={handleReset}
			toggleModal={toggleModal}
			showModal={showModal}
		>
			{children}
		</EnhancedWrapper>
	</ModalContainer>
);

export default Modal;
