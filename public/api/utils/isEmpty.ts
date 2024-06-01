export function isEmpty(arrayVars: Array<string>){
	let countEmpty = 0;

	arrayVars.forEach((item: string) => {
		if(item === ""){
			countEmpty++;
		}
	})

	return countEmpty > 0
}
