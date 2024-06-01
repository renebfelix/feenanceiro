import { createPassword } from "../../../utils/generatePassword";
import { database } from "../../prisma/client";

export async function verifyPasswordUtil(password: string, uuid: string){
	const selectPassword = await database.users.findFirst({
		where: {
			idUser: uuid,
			passwordUser: createPassword(password)
		},
		select: {
			passwordUser: true
		}
	})

	return selectPassword;
}
