export interface IAllResult {
	id: number;
	userId: number;
	title: string;
	description: string;
	status: number;
	deadline: string;
	createdAt: string;
	updatedAt: string;
}

interface IAllMeta {
	totalItems: number;
	totalPages: number;
	currentPage: number;
	nextPage?: string;
	prevPage?: string;
}

export interface IGetAll {
	statusCode: number;
	message: string;
	data: {
		result: IAllResult[];
		meta: IAllMeta;
	};
}

export interface ISingleResult {
	statusCode: number;
	message: string;
	data: IAllResult;
}
