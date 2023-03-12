import React from "react";

import { Paper, Typography, Stack, Button, Container } from "@mui/material";

import { Input, Checkbox, Segmented } from "antd";

import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, useForm, FieldValues } from "react-hook-form";
import { loginResolver } from "./resolver";
import ErrorSuffix from "@/components/antd/ErrorSuffix";
import Iconify from "@components/iconify";
import { useRegister } from "@/queries/auth";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import useAuth from "@/hooks/useAuth";

const Register: React.FC = () => {
	const { setToken } = useAuth();
	const { mutateAsync, isLoading: isLoginLoading } = useRegister();

	const {
		// reset,
		handleSubmit,
		control,
	} = useForm({
		resolver: joiResolver(loginResolver),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			gender: "male",
			remember: true,
		},
	});

	const onValid = async ({
		email,
		password,
		name,
		gender,
		remember,
	}: FieldValues) => {
		message.open({
			type: "loading",
			content: "Creating account..",
			duration: 0,
		});
		const res = await handleResponse(() =>
			mutateAsync({ email, password, name, gender })
		);
		message.destroy();
		if (res.status) {
			message.success(res.message);
			setToken(res.data.user_id, remember);
		} else {
			message.error(res.message);
		}
	};

	return (
		<Container
			maxWidth={"sm"}
			className="min-h-screen flex flex-col items-center justify-between relative py-2"
		>
			<div />
			<div className="flex flex-col items-center">
				<Typography
					variant="h6"
					sx={{ fontWeight: "700" }}
					className={"mb-3 text-[1.1em] text-center"}
				>
					Create a new account
				</Typography>
				<form onSubmit={handleSubmit(onValid)}>
					<Paper
						elevation={0}
						sx={{
							p: 2,
							width: "95vw",
							maxWidth: "350px",
							"& > *": { my: 0.8 },
						}}
					>
						<Typography>Full Name</Typography>

						<Controller
							control={control}
							name={"name"}
							rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Input
									prefix={
										<Icon
											icon="material-symbols:verified-user"
											color="#999"
											className="mr-1 text-xl"
										/>
									}
									placeholder={"Full Name"}
									size={"large"}
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									status={error ? "error" : ""}
									suffix={<ErrorSuffix error={error} />}
								/>
							)}
						/>

						<Typography>Gender</Typography>

						<Controller
							control={control}
							name={"gender"}
							rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Segmented
									// placeholder={"Select a gender"}
									block
									size={"large"}
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									// status={error ? "error" : ""}
									options={[
										{ value: "male", label: "Male" },
										{ value: "female", label: "Female" },
										{ value: "others", label: "Others" },
									]}
									className="w-full"
									onResize={undefined}
									onResizeCapture={undefined}
								/>
							)}
						/>

						<Typography>Email</Typography>

						<Controller
							control={control}
							name={"email"}
							rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Input
									prefix={
										<Icon
											icon="mdi:email-outline"
											color="#999"
											className="mr-1 text-xl"
										/>
									}
									placeholder={"Email"}
									size={"large"}
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									status={error ? "error" : ""}
									suffix={<ErrorSuffix error={error} />}
								/>
							)}
						/>

						<Controller
							control={control}
							name={"password"}
							rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<>
									<Typography className="flex flex-row items-center gap-1">
										Password
										<ErrorSuffix
											error={error}
											size="small"
										/>
									</Typography>
									<Input.Password
										prefix={
											<Icon
												icon="ri:lock-password-line"
												color="#999"
												className="mr-1 text-xl"
											/>
										}
										placeholder={"Password"}
										size="large"
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										status={error ? "error" : ""}
										// suffix={}
										autoComplete="new-password"
									/>
								</>
							)}
						/>

						<Stack
							direction={"row"}
							justifyContent={"space-between"}
							alignItems={"center"}
							className={"py-1 mb-2"}
						>
							<Controller
								control={control}
								name={"remember"}
								render={({ field: { onChange, value } }) => (
									<Checkbox
										onChange={onChange}
										checked={value}
									>
										I Agree with the terms and conditions
									</Checkbox>
								)}
							/>

							{/* <Link to={"/recover"}>
								<Typography variant="caption">Forgot Password?</Typography>
							</Link> */}
						</Stack>
						<Button
							variant="contained"
							fullWidth
							size="large"
							type={"submit"}
							disabled={isLoginLoading}
						>
							Create
						</Button>
					</Paper>
				</form>
			</div>
			<Link to={"/"}>
				<Typography
					variant="subtitle2"
					className="flex flex-row items-center gap-2 font-semibold text-center"
				>
					<Iconify icon={"material-symbols:arrow-back-ios-new"} />
					Return to sign in
				</Typography>
			</Link>
			<div />
		</Container>
	);
};

export default Register;
