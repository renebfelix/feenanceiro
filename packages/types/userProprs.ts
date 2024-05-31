export interface UserProps {
	id: number;
	username: string;
	email: string;
	fullname: string;
	limit?: number;
	photo?: string;
	uuid: string;
	refreshToken?: string;
	deleted: boolean;
	blocked: boolean;
}
