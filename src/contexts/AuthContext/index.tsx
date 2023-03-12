import React from "react";
import { IAuthContext, IToken, IUser } from "./types";
import { message } from "@components/antd/message";
import { useLogin, useGetValidation } from "@/queries/auth";
import handleResponse from "@/utilities/handleResponse";
import useAreYouSure from "@/hooks/useAreYouSure";
import { Typography } from "@mui/material";

const defaultValues: IAuthContext = {
	isLoggedIn: false,
	token: null,
	setToken: () => {},
	user: {
		id: "",
		email: "",
		name: "",
		gender: "",
	},
	isLoading: false,
	login: () => {},
	isLoginLoading: false,
	logout: () => {},
};

const AuthContext = React.createContext<IAuthContext>(defaultValues);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [messageApi, contextHolder] = message.useMessage();

	const [token, setToken] = React.useState<IToken>(
		sessionStorage.getItem("token") || localStorage.getItem("token")
	);
	const [user, setUser] = React.useState<IUser>(defaultValues.user);

	const { mutateAsync: mutateLogin, isLoading: isLoginLoading } = useLogin();

	const {
		data: validationData,
		isLoading: isValidationLoading,
		isError: isValidationError,
		error,
	} = useGetValidation(token);

	React.useEffect(() => {
		if (!validationData) return;
		setUser(validationData?.data);
	}, [validationData]);

	React.useEffect(() => {
		let status = error?.request?.status;
		if (!isValidationError || [401, 404].includes(status || 0)) return;

		messageApi.open({
			type: "loading",
			content: "Signing out..",
			duration: 0,
		});
		setTimeout(() => {
			messageApi.destroy();
			localStorage.removeItem("token");
			sessionStorage.removeItem("token");
			setToken(null);
			messageApi.success("Logged out! Please sign in again");
		}, 1000);
	}, [isValidationError]);

	const handleToken = (tkn: IToken, remember: boolean | false) => {
		if (!tkn) return;
		if (remember) localStorage.setItem("token", tkn);
		else sessionStorage.setItem("token", tkn);
		setToken(tkn);
	};

	const login = async (
		email: string,
		password: string,
		remember: boolean | false
	) => {
		messageApi.open({
			type: "loading",
			content: "Logging in..",
			duration: 0,
		});

		const res = await handleResponse(() => mutateLogin({ email, password }));
		messageApi.destroy();
		if (res.status) {
			handleToken(res.data?.user_id, remember);
			messageApi.success("Welcome!!");
		} else {
			messageApi.error(res.message || "Something went wrong!");
		}
	};

	const logout = async () => {
		messageApi.open({
			type: "loading",
			content: "Signing out..",
			duration: 0,
		});
		setTimeout(() => {
			messageApi.destroy();
			localStorage.removeItem("token");
			sessionStorage.removeItem("token");
			setToken(null);
			messageApi.success("Logged out! Please sign in again");
		}, 1000);
	};

	const AreYouSure = useAreYouSure({
		color: "error",
		title: "Logout",
	});

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token,
				setToken: handleToken,
				user,
				isLoading: isValidationLoading,
				login,
				isLoginLoading,
				logout: async () =>
					AreYouSure.open(
						() => logout(),
						<>
							<Typography variant="body1">You want to logout?</Typography>
						</>
					),
			}}
		>
			{children}
			{contextHolder}
			{AreYouSure.contextHolder}
		</AuthContext.Provider>
	);
};

export default AuthContext;
