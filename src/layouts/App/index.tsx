import React from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Box, Container } from "@mui/material";
import AuthContext from "@/contexts/AuthContext";

const AppHeader = React.lazy(() => import("./Header"));

const AppLayout: React.FC | any = () => {
	const location = useLocation();

	const auth = React.useContext(AuthContext);

	return auth.isLoggedIn ? (
		<Box
			component="main"
			sx={{
				p: 1,
				maxWidth: "100vw",
				overflow: "hidden",
				overflowY: "auto",
			}}
		>
			<AppHeader />
			<Container>
				<Outlet />
			</Container>
		</Box>
	) : (
		<Navigate to={`/?to=${location.pathname}`} />
	);
};

export default React.memo(AppLayout);
