import React, { lazy } from "react";

import theme from "@styles/theme";
import ThemeProvider from "@mui/system/ThemeProvider";
import { CssBaseline } from "@mui/material";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";

const BaseRoutes = lazy(() => import("./routes"));

const query = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const App: React.FC = () => {
	return (
		<QueryClientProvider client={query}>
			<ThemeProvider theme={theme}>
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: theme.palette.primary.main,
							borderRadius: 4,
							fontFamily: theme.typography.fontFamily,
						},
					}}
				>
					<CssBaseline />
					<AuthProvider>
						<BaseRoutes />
					</AuthProvider>
				</ConfigProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};

export default App;
