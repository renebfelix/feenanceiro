import { Grid } from "@chakra-ui/react";
import { MoneyCard } from "../../components/MoneyCard/MoneyCard";
import { useBillsContext } from "@feenanceiro/context";

export function CardsValues(){
	const { meta, status } = useBillsContext();

	return (
		<Grid templateColumns={{base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)"}} gap={3} my={4}>
			<MoneyCard type="ENTRADA" title="Total entrada" value={meta.totalEntradas} loading={status.isLoading} />
			<MoneyCard type="SAIDA" title="Total gasto" value={meta.totalGasto} loading={status.isLoading} />
			<MoneyCard type="DEFAULT" title="Total pago" value={meta.totalPago} loading={status.isLoading} />
			<MoneyCard type="DEFAULT" title="Restante" value={meta.totalGasto - meta.totalPago} loading={status.isLoading} />
		</Grid>
	)
}
