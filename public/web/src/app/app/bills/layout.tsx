import { ReactNode } from 'react';
import { BillsContext } from '@feenanceiro/context';

export default function LayoutBillsRoot({ children }: Readonly<{children: ReactNode}>){
	return (
		<BillsContext>
			{children}
		</BillsContext>
	)
}
