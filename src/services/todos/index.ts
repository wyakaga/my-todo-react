import { useQuery, useMutation } from "@tanstack/react-query";

import { getAll, updateStatus } from "./http";
import IController from "@/interfaces/controller.interface";

export const useGetAllQuery = (page: number, token: string, controller: IController) => {
	return useQuery({
		queryKey: ["todo", "all", page],
		queryFn: async () => getAll(page, token, controller),
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
