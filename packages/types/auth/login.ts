export interface ResponseSuccessLoginProps {
	refreshToken: {
		idRefresh: string;
		expiresInRefresh: number;
		idUserRefresh: string;
	},
	token: string
}

export interface LoginPostProps {
	username: string;
	password: string;
}
