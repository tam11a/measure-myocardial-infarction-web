import React from "react";

import { Paper, Typography, Button, Divider } from "@mui/material";

import { Input, Segmented } from "antd";

import { Icon } from "@iconify/react";

import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, useForm, FieldValues } from "react-hook-form";
import { loginResolver } from "./resolver";
import ErrorSuffix from "@/components/antd/ErrorSuffix";
import { useUpdate } from "@/queries/auth";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import useUser from "@/hooks/useUser";

const Profile: React.FC = () => {
	const user = useUser();
	const { mutateAsync, isLoading: isLoginLoading } = useUpdate();

	const { reset, handleSubmit, control } = useForm({
		resolver: joiResolver(loginResolver),
		defaultValues: {
			user_id: user.id,
			name: user.name || "",
			email: user.email || "",
			gender: user.gender || "male",
			password: "",
		},
	});

	React.useEffect(() => {
		if (!user) return;
		reset({
			user_id: user.id,
			name: user.name || "",
			email: user.email || "",
			gender: user.gender || "male",
			password: "",
		});
	}, [user.id, user.name, user.email, user.gender]);

	const onValid = async ({
		email,
		password,
		name,
		gender,
		user_id,
	}: FieldValues) => {
		message.open({
			type: "loading",
			content: "Updating information..",
			duration: 0,
		});
		const res = await handleResponse(() =>
			mutateAsync({ email, password, name, gender, user_id })
		);
		message.destroy();
		if (res.status) {
			message.success(res.message);
		} else {
			message.error(res.message);
		}
	};

	return (
		<div className="flex flex-col items-center py-5">
			<Typography
				variant="h6"
				sx={{ fontWeight: "700" }}
				className={"mb-3 text-[1em] text-center"}
			>
				{user.name?.split?.(" ")[0]}'s Information
			</Typography>
			<Typography
				variant="caption"
				className="text-center text-slate-500 max-w-xs"
			>
				Use your current password to verify you to update personal information.
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
								className="w-full mb-3"
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

					<Divider className="border-b-2 border-slate-300 border-dashed my-6" />

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
									Current Password
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
									placeholder={"Your Current Password"}
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

					<Button
						className="mt-3"
						variant="contained"
						fullWidth
						size="large"
						type={"submit"}
						disabled={isLoginLoading}
					>
						Update
					</Button>
				</Paper>
			</form>
		</div>
	);
};

export default Profile;
