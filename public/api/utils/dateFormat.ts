export function stringDateFormat(date: string){
	let dateSplit = date.split('/');

	return new Date(`${dateSplit[2]+"-"+dateSplit[1]+"-"+dateSplit[0]}`);;
}
