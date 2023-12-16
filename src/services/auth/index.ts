import { useMutation } from "@tanstack/react-query";

import { login, register } from "./http";
import IController from "@/interfaces/controller.interface";

export const useLoginMutation = () => {
	return useMutation({
		mutationKey: ["auth", "login"],
		mutationFn: async ({
			email,
			password,
			controller,
		}: {
			email: string;
			password: string;
			controller: IController;
		}) => login(email, password, controller),
	});
};

export const useRegisterMutation = () => {
	return useMutation({
		mutationKey: ["auth", "register"],
		mutationFn: ({
			email,
			password,
			controller,
		}: {
			email: string;
			password: string;
			controller: IController;
		}) => register(email, password, controller),
	});
};
