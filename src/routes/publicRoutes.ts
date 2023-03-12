import { lazy } from "react";
import { PUBLIC_ROUTES } from "./paths";

export const publicRoutes = [
	{
		path: PUBLIC_ROUTES.HOME,
		Component: lazy(() => import("@pages/Login")),
	},
	{
		path: PUBLIC_ROUTES.REGISTER,
		Component: lazy(() => import("@pages/Register")),
	},
	{
		path: PUBLIC_ROUTES.NOTFOUND,
		Component: lazy(() => import("@pages/NotFound")),
	},
];
