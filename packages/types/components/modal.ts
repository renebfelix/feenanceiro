export interface ControlDisclosureProps {
	isOpen: boolean,
	onClose: () => void,
	onOpen: () => void,
}


export interface ModalComponentProps {
	title: string;
	bodyComponent: React.ReactNode;
	footerComponent?: React.ReactNode;
}
