import IController from "@/interfaces/controller.interface";
import { IGetAll, IAllResult } from "@/interfaces/responses/todos.interface";
import api from "../base";

export const getAll = async (
	page: number,
	token: string | undefined,
	controller: IController
): Promise<IGetAll> => {
	const config = {
		headers: { Authorization: `Bearer ${token}` },
		signal: controller.signal,
	};
	const response = await api.get(`/api/v1/todo?page=${page}`, config);
	return response.data;
};

export const updateStatus = async (
	status: number,
	id: number,
	token: string | undefined,
	controller: IController
): Promise<IAllResult> => {
	const body = { status };
	const config = {
		headers: { Authorization: `Bearer ${token}` },
		signal: controller.signal,
	};
	const response = await api.patch(`/api/v1/todo/${id}/status`, body, config);
	return response.data;
};
