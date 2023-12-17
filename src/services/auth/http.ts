import IController from "@/interfaces/controller.interface";
import { ILoginRes, ILogoutRes, IRegisterRes } from "@/interfaces/responses/auth.interface";
import api from "../base";

export const login = async (
	email: string,
	password: string,
	controller: IController
): Promise<ILoginRes> => {
	const body = { email, password };
	const config = { signal: controller.signal };
	const response = await api.post("/api/v1/auth/login", body, config);
	return response.data;
};

export const register = async (
	email: string,
	password: string,
	controller: IController
): Promise<IRegisterRes> => {
	const body = { email, password };
	const config = { signal: controller.signal };
	const response = await api.post("/api/v1/auth/register", body, config);
	return response.data;
};

export const logout = async (token: string, controller: IController): Promise<ILogoutRes> => {
	const config = {
		headers: { Authorization: `Bearer ${token}` },
		signal: controller.signal,
	};
	const response = await api.delete("api/v1/auth/logout", config);
	return response.data;
};
