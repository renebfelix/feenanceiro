import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton} from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";

export function ModalDefault(){
	const { controlModal, modalComponent } = useMainContext();

	return (
		<Modal
			isOpen={controlModal.isOpen}
			onClose={controlModal.onClose}
			size={"xl"}
		>
			<ModalOverlay />

			<ModalContent>
				<ModalHeader borderBottom={"1px solid"} borderBottomColor={"neutral.100"}>{modalComponent.title}</ModalHeader>
				<ModalCloseButton />

				{modalComponent.bodyComponent}
			</ModalContent>
		</Modal>
	)
}
