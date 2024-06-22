import { getFetch } from "@/app/services/fetchs/getFetch";
import { USER_INITIAL_STATE } from "@feenanceiro/context";
import { UserFetchProps } from "@feenanceiro/types";

export async function fetchUser(): Promise<UserFetchProps> {
	const userData = await getFetch({method: "GET", url: '/app/user'});

	if (userData.code || userData === undefined){
		return {
			data: USER_INITIAL_STATE.data,
			status: {
				isLoading: false,
				hasError: true,
			}
		}
	} else {
		return {
			data: userData,
			status: {
				isLoading: false,
				hasError: false,
			}
		}
	}
}
