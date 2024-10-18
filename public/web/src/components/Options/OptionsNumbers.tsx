export function OptionsNumbers(params: { lastNumber: number }){
	return (
		Array.from({ length: params.lastNumber }, (_, i) => i + 1).map((number) => (
			<option key={number} value={number}>
			  {number}
			</option>
		  ))
	)
}
