import IController from "@/interfaces/controller.interface";
import { IGetAll, IAllResult, ICreate } from "@/interfaces/responses/todos.interface";
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

export const createTodo = async (
	title: string,
	description: string,
	deadline: string,
	token: string | undefined,
	controller: IController
): Promise<ICreate> => {
	const body = { title, description, deadline };
	const config = {
		headers: { Authorization: `Bearer ${token}` },
		signal: controller.signal,
	};
	const response = await api.post("api/v1/todo", body, config);
	return response.data;
};
