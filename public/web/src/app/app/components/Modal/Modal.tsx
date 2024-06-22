import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter} from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";

export function ModalDefault(){
	const { controlModalBillings, modalComponent } = useMainContext();

	return (
		<Modal
			isOpen={controlModalBillings.isOpen}
			onClose={controlModalBillings.onClose}
			size={"xl"}
		>
			<ModalOverlay />

			<ModalContent>
				<ModalHeader borderBottom={"1px solid"} borderBottomColor={"neutral.100"}>{modalComponent.title}</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					{modalComponent.bodyComponent}
				</ModalBody>

				{modalComponent.footerComponent && (
					<ModalFooter borderTop={"1px solid"} borderTopColor={"neutral.100"}>
						{modalComponent.footerComponent}
					</ModalFooter>
				)}
			</ModalContent>
		</Modal>
	)
}
