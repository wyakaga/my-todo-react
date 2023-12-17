export interface ILoginRes {
	statusCode: number;
	message: string;
	data: {
		token: string;
	};
}

export interface IRegisterRes {
	statusCode: number;
	message: string;
	data: {
		id: number;
		email: string;
		firstName?: string;
		lastName?: string;
		createdAt: string;
		updatedAt: string;
	}
}

export interface ILogoutRes {
	statusCode: number;
	message: string;
}
