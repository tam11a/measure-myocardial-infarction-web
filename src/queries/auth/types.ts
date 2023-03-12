// Login Type
export type ILogin = {
	email: string;
	password: string;
};

export type IUpdateUser = {
	user_id: string;
	password: string;
	name?: string;
	email?: string;
	gender?: string;
	new_password?: string;
};

//Sigup Type
export type ISignup = {
	name: string;
	email: string;
	password: string;
	gender: string;
};
