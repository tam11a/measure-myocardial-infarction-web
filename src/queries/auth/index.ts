import instance from "@/services";
import { ILogin, ISignup, IUpdateUser } from "./types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IToken } from "@/contexts/AuthContext/types";

// Login function with instance
const login = (data: ILogin) => {
	return instance.post("/login", data);
};
export const useLogin = () => {
	return useMutation(login);
};

// Register function with instance
const register = (data: ISignup) => {
	return instance.post("/register", data);
};
export const useRegister = () => {
	return useMutation(register);
};

// Update function with instance
const update = (data: IUpdateUser) => {
	return instance.put("/profile", data);
};
export const useUpdate = () => {
	return useMutation(update);
};

// Validation function with instance
const getValidateUser = (id: IToken) => {
	return instance.get(`/profile/${id}`);
};

export const useGetValidation = (token: string | null) => {
	return useQuery(["validate", token], () => getValidateUser(token), {
		enabled: !!token,
		retry: 1,
		onError: async (error: { request: { status: number } }) => {
			return error.request.status;
		},
	});
};

const getReport = (data: {
	age: number;
	systolicBP: number;
	diastolicBP: number;
	troponin: number;
	chestpainandpainilefthandnadjaw: number;
	ECG: number;
	user_id: string;
}) =>
	instance.get("/calculate", {
		params: data,
	});

export const useGetReport = () => useMutation(getReport);

export const getAttachment = (url: string) =>
	instance.getUri({
		url,
	});
