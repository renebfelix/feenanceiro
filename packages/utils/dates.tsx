import moment from "moment";

export const fullMonthsName = [
	"Janeiro",
	"Fevereiro",
	"Março",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro"
]

export const minMonthsName = [
	"Jan",
	"Fev",
	"Mar",
	"Abr",
	"Mai",
	"Jun",
	"Jul",
	"Ago",
	"Set",
	"Out",
	"Nov",
	"Dez"
];

export function formatDateBasic(date: any){
	const day = moment(date, "YYYY-MM-DD").format("DD");
	const month = moment(date, "YYYY-MM-DD").format("M");
	const year = moment(date, "YYYY-MM-DD").format("YYYY");

	return  day+" "+minMonthsName[Number(month)-1]+" "+year;
}
