export type IToken = string | null;

export type IUser = {
	id: IToken;
	name: string;
	email: string;
	gender: string;
};

export type IAuthContext = {
	isLoggedIn: boolean;
	token: IToken;
	setToken: (token: IToken, remember: boolean | false) => void;
	user: IUser;
	isLoading: boolean | false;
	login: (email: string, password: string, remember: boolean | false) => void;
	isLoginLoading: boolean;
	logout: () => void;
};
