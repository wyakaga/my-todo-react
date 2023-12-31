import { useQuery, useMutation } from "@tanstack/react-query";

import { createTodo, deleteTodo, getAll, getSingle, updateStatus, updateTodo } from "./http";
import IController from "@/interfaces/controller.interface";

export const useGetAllQuery = (page: number, token: string, controller: IController) => {
	return useQuery({
		queryKey: ["todo", "all", page],
		queryFn: async () => getAll(page, token, controller),
	});
};

export const useGetSingleQuery = (id: number, token: string, controller: IController) => {
	return useQuery({
		queryKey: ["todo", "single", id],
		queryFn: async () => getSingle(id, token, controller),
	});
};

export const useUpdateStatusMutation = () => {
	return useMutation({
		mutationKey: ["todo", "update", "status"],
		mutationFn: async ({
			status,
			id,
			token,
			controller,
		}: {
			status: number;
			id: number;
			token: string | undefined;
			controller: IController;
		}) => updateStatus(status, id, token, controller),
	});
};

export const useUpdateTodoMutation = () => {
	return useMutation({
		mutationKey: ["todo", "update", "content"],
		mutationFn: async ({
			id,
			token,
			controller,
			title,
			description,
			deadline,
		}: {
			id: number;
			token: string | undefined;
			controller: IController;
			title?: string;
			description?: string;
			deadline?: string;
		}) => updateTodo(id, token, controller, title, description, deadline),
	});
};

export const useCreateTodoMutation = () => {
	return useMutation({
		mutationKey: ["todo", "create"],
		mutationFn: async ({
			title,
			description,
			deadline,
			token,
			controller,
		}: {
			title: string;
			description: string;
			deadline: string;
			token: string | undefined;
			controller: IController;
		}) => createTodo(title, description, deadline, token, controller),
	});
};

export const useDeleteTodoMutation = () => {
	return useMutation({
		mutationKey: ["todo", "delete"],
		mutationFn: async ({
			id,
			token,
			controller,
		}: {
			id: number;
			token: string | undefined;
			controller: IController;
		}) => deleteTodo(id, token, controller),
	});
};
