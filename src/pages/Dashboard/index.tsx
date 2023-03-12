import useAuth from "@/hooks/useAuth";
import Iconify from "@components/iconify";
import { Avatar, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
	const { logout } = useAuth();
	return (
		<div className="flex flex-col items-center justify-between py-4 min-h-[80vh]">
			<Avatar
				src={"/heart.svg"}
				variant="square"
				className="w-full h-auto max-w-[420px]"
			/>
			<div className="flex flex-col gap-2">
				<Typography
					variant="h6"
					className="mb-3 font-bold"
				>
					Application Shortcuts
				</Typography>
				<Link to="/app/profile">
					<Button startIcon={<Iconify icon={"mdi:user-details"} />}>
						User Profile
					</Button>
				</Link>
				<Link to="/app/measure">
					<Button
						startIcon={
							<Iconify icon={"material-symbols:monitor-heart-rounded"} />
						}
					>
						Measure Myocardial Infarction Condition
					</Button>
				</Link>
				<div>
					<Button
						color="error"
						startIcon={<Iconify icon={"humbleicons:logout"} />}
						onClick={() => logout()}
					>
						Logout
					</Button>
				</div>
			</div>
			<div />
		</div>
	);
};

export default Dashboard;
