import { MetaTagsBillsProps, BillProps } from "../features/bills";

export interface ShareProps {
	meta: MetaTagsBillsProps,
	infos: {
		mainUser: string;
		responsable: string;
	},
	items: Array<BillProps>
}
