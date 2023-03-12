import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import Iconify from "@components/iconify";
import {
	AppBar,
	Avatar,
	Button,
	Container,
	Hidden,
	IconButton,
	ListItemText,
	Toolbar,
	Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const AppHeader: React.FC = () => {
	const user = useUser();
	const { logout } = useAuth();
	return (
		<>
			<AppBar
				sx={{ bgcolor: "transparent" }}
				className="bg-slate-200 shadow-md shadow-slate-300"
			>
				<Toolbar>
					<Container className="flex flex-row items-center gap-2">
						<Link to={"/app"}>
							<Avatar
								src="/favicon.svg"
								variant="square"
							/>
						</Link>
						<ListItemText
							primary={
								<Typography className="text-slate-700 text-sm font-bold">
									Hello, {user.name?.split(" ")[0]}!
								</Typography>
							}
							secondary={
								<Link to={"/app/profile"}>
									<Typography variant="caption">View Profile</Typography>
								</Link>
							}
						/>
						<Link to={"/app/measure"}>
							<Hidden smUp>
								<IconButton color="primary">
									<Iconify icon={"material-symbols:monitor-heart-rounded"} />
								</IconButton>
							</Hidden>
							<Hidden smDown>
								<Button
									variant="contained"
									className="rounded-full"
								>
									Let's Measure
								</Button>
							</Hidden>
						</Link>
						<IconButton
							color="error"
							onClick={() => logout()}
						>
							<Iconify icon={"humbleicons:logout"} />
						</IconButton>
					</Container>
				</Toolbar>
			</AppBar>
			<div className="mt-[65px]" />
		</>
	);
};

export default AppHeader;
