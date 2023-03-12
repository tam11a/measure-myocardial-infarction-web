import useUser from "@/hooks/useUser";
import { useGetReport } from "@/queries/auth";
import { message } from "@components/antd/message";
import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import { InputNumber, Slider } from "antd";
import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import Result from "./Result";
import moment from "moment";

const defaultValues = {
	age: 55,
	systolicBP: 170,
	diastolicBP: 65,
	troponin: 7,
	chestpainandpainilefthandnadjaw: 1,
	ECG: 2,
};

const Measure: React.FC = () => {
	const user = useUser();
	const {
		reset,
		handleSubmit,
		control,
		formState: { isDirty },
	} = useForm({
		defaultValues: {
			...defaultValues,
			user_id: user.id,
		},
	});

	React.useEffect(() => {
		reset({
			...defaultValues,
			user_id: user.id,
		});
	}, [user.id]);

	const [result, setResult] = React.useState();

	const onCloseResult = () => {
		setResult(undefined);
		reset({
			...defaultValues,
			user_id: user.id,
		});
	};

	const { mutateAsync, isLoading } = useGetReport();

	const onValid = async ({
		age,
		systolicBP,
		diastolicBP,
		troponin,
		chestpainandpainilefthandnadjaw,
		ECG,
		user_id,
	}: FieldValues) => {
		message.open({
			type: "loading",
			content: "Analyzing data..",
			duration: 0,
		});
		var res;
		try {
			res = await mutateAsync({
				age,
				systolicBP,
				diastolicBP,
				troponin,
				chestpainandpainilefthandnadjaw,
				ECG,
				user_id,
			});
		} catch {
			message.error("Something went wrong!");
		}
		message.destroy();
		if (res?.status === 200) {
			message.success("Report generated successfully");
			setResult({
				age,
				systolicBP,
				diastolicBP,
				troponin,
				chestpainandpainilefthandnadjaw,
				ECG,
				ts: moment(),
				...res?.data,
			});
		} else message.error("Something went wrong!");
	};
	return (
		<Container
			maxWidth={"sm"}
			className="py-5"
		>
			{!!result && (
				<Result
					data={result}
					onClose={onCloseResult}
				/>
			)}
			<Typography
				variant="h6"
				sx={{ fontWeight: "700" }}
				className={"mt-2 text-[1.1em] text-center"}
			>
				Measure Myocardial Infraction
			</Typography>
			<Typography
				variant="h6"
				className="text-center text-[0.8em] text-slate-500"
			>
				To measure myocardial infraction, Please fill up the following form.
			</Typography>

			<form
				onSubmit={handleSubmit(onValid)}
				className="mt-7"
			>
				<Typography
					variant="overline"
					className="font-bold"
				>
					Age
				</Typography>

				<Controller
					control={control}
					name={"age"}
					rules={{ required: true }}
					render={({ field: { onChange, value } }) => (
						<div className="flex flex-row gap-5 items-center">
							<Slider
								min={0}
								max={100}
								marks={{ 0: "0", 50: "50", 100: "100" }}
								onChange={onChange}
								value={typeof value === "number" ? value : 0}
								className="flex-1"
							/>
							<InputNumber
								min={0}
								max={100}
								value={value}
								onChange={onChange}
							/>
						</div>
					)}
				/>
				<Typography
					variant="overline"
					className="font-bold"
				>
					Systolic BP
				</Typography>

				<Controller
					control={control}
					name={"systolicBP"}
					rules={{ required: true }}
					render={({ field: { onChange, value } }) => (
						<div className="flex flex-row gap-5 items-center">
							<Slider
								min={0}
								max={200}
								marks={{ 0: "0", 100: "100", 200: "200" }}
								onChange={onChange}
								value={typeof value === "number" ? value : 0}
								className="flex-1"
							/>
							<InputNumber
								min={0}
								max={200}
								value={value}
								onChange={onChange}
							/>
						</div>
					)}
				/>
				<Typography
					variant="overline"
					className="font-bold"
				>
					Diastolic BP
				</Typography>

				<Controller
					control={control}
					name={"diastolicBP"}
					rules={{ required: true }}
					render={({ field: { onChange, value } }) => (
						<div className="flex flex-row gap-5 items-center">
							<Slider
								min={0}
								max={150}
								marks={{ 0: "0", 50: "50", 100: "100", 150: "150" }}
								onChange={onChange}
								value={typeof value === "number" ? value : 0}
								className="flex-1"
							/>
							<InputNumber
								min={0}
								max={150}
								value={value}
								onChange={onChange}
							/>
						</div>
					)}
				/>
				<Typography
					variant="overline"
					className="font-bold"
				>
					Troponin
				</Typography>

				<Controller
					control={control}
					name={"troponin"}
					rules={{ required: true }}
					render={({ field: { onChange, value } }) => (
						<div className="flex flex-row gap-5 items-center">
							<Slider
								min={0}
								max={13}
								marks={{ 0: "0", 13: "13" }}
								onChange={onChange}
								value={typeof value === "number" ? value : 0}
								className="flex-1"
							/>
							<InputNumber
								min={0}
								max={13}
								value={value}
								onChange={onChange}
							/>
						</div>
					)}
				/>
				<Typography
					variant="overline"
					className="font-bold"
				>
					Pain
				</Typography>

				<Controller
					control={control}
					name={"chestpainandpainilefthandnadjaw"}
					rules={{ required: true }}
					render={({ field: { onChange, value } }) => (
						<div className="flex flex-row gap-5 items-center">
							<Slider
								min={0}
								max={5}
								marks={{ 0: "0", 5: "5" }}
								onChange={onChange}
								value={typeof value === "number" ? value : 0}
								className="flex-1"
							/>
							<InputNumber
								min={0}
								max={5}
								value={value}
								onChange={onChange}
							/>
						</div>
					)}
				/>
				<Typography
					variant="overline"
					className="font-bold"
				>
					ECG
				</Typography>

				<Controller
					control={control}
					name={"ECG"}
					rules={{ required: true }}
					render={({ field: { onChange, value } }) => (
						<div className="flex flex-row gap-5 items-center">
							<Slider
								min={0}
								max={4}
								marks={{ 0: "0", 4: "4" }}
								onChange={onChange}
								value={typeof value === "number" ? value : 0}
								className="flex-1"
							/>
							<InputNumber
								min={0}
								max={4}
								value={value}
								onChange={onChange}
							/>
						</div>
					)}
				/>

				<ButtonGroup className="mt-8 float-right">
					{isDirty && (
						<Button
							fullWidth
							variant="contained"
							size="large"
							color={"error"}
							onClick={() =>
								reset({
									...defaultValues,
									user_id: user.id,
								})
							}
						>
							Reset
						</Button>
					)}
					<Button
						variant="contained"
						fullWidth
						size="large"
						type={"submit"}
						disabled={isLoading}
					>
						Proceed
					</Button>
				</ButtonGroup>
			</form>
		</Container>
	);
};

export default Measure;
