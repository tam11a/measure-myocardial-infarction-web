import {
	Avatar,
	Button,
	ButtonGroup,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";
import { Descriptions } from "antd";
import moment from "moment";
import React from "react";
import { getAttachment } from "../../queries/auth/index";
import { Preview, print } from "react-html2pdf";

const Result: React.FC<{ data: any; onClose: () => void }> = ({
	data,
	onClose,
}) => {
	return (
		<Dialog
			open
			onClose={onClose}
			PaperProps={{
				className: "w-[95vw] max-w-[960px]",
			}}
		>
			<DialogTitle>Report in Details</DialogTitle>
			<Preview id={"jsx-template"}>
				<DialogContent>
					<Descriptions
						// title="Report in Details"
						bordered
					>
						<Descriptions.Item
							label="Patient"
							className="font-bold"
							span={3}
						>
							{data?.name}
						</Descriptions.Item>
						<Descriptions.Item label="Age">{data?.age}</Descriptions.Item>
						<Descriptions.Item label="SystolicBP">
							{data?.systolicBP}
						</Descriptions.Item>
						<Descriptions.Item label="DiastolicBP">
							{data?.diastolicBP}
						</Descriptions.Item>
						<Descriptions.Item label="Tropnin">
							{data?.troponin}
						</Descriptions.Item>
						<Descriptions.Item label="Pain">
							{data?.chestpainandpainilefthandnadjaw}
						</Descriptions.Item>
						<Descriptions.Item label="ECG">{data?.ECG}</Descriptions.Item>
						<Descriptions.Item
							label="Test Time"
							span={2}
						>
							{moment(data?.ts).format("L")}
						</Descriptions.Item>
						<Descriptions.Item label="Status">
							<Typography
								variant="h6"
								className="font-bold"
								sx={{
									color:
										data?.score?.toFixed(2) > 30
											? "error.main"
											: data?.score?.toFixed(2) > 20
											? "warning.main"
											: "success.main",
								}}
							>
								{data?.score?.toFixed(2) > 30
									? "HIGH"
									: data?.score?.toFixed(2) > 20
									? "MEDIUM"
									: "LOW"}
							</Typography>
						</Descriptions.Item>

						<Descriptions.Item
							span={3}
							label="Recommendation*"
							className="font-bold"
						>
							{data?.score?.toFixed(2) > 30
								? "Patient has high level of myocardial infraction."
								: data?.score?.toFixed(2) > 20
								? "Patient has medium level of myocardial infraction."
								: "Patient has low level of myocardial infraction."}
						</Descriptions.Item>
						<Descriptions.Item
							span={3}
							label="Advice*"
							className="font-bold"
						>
							{data?.score?.toFixed(2) > 30
								? "You should be admitted to the hospital as soon as possible."
								: data?.score?.toFixed(2) > 20
								? "After Six months stay on echo ECG regular checkup."
								: "Avoid foods that cause chest pain. Go to the doctor for regular checkup."}
						</Descriptions.Item>
					</Descriptions>
					<Avatar
						variant="rounded"
						src={getAttachment(data?.attachment)}
						sx={{
							width: "100%",
							height: "auto",
							maxWidth: "580px",
							mx: "auto",
							my: 4,
						}}
					/>
				</DialogContent>
			</Preview>
			<DialogActions>
				<ButtonGroup>
					<Button onClick={onClose}>Cancel</Button>
					<Button
						variant="contained"
						onClick={() =>
							print(
								`Report of ${data?.name} - ${moment().format("llll")}`,
								"jsx-template"
							)
						}
					>
						Print
					</Button>
				</ButtonGroup>
			</DialogActions>
		</Dialog>
	);
};

export default Result;
