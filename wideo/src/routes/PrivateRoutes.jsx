import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-context";


export const PrivateRoutes = () => {
	const { auth } = useAuth();
	const location = useLocation();
	return auth.isAuthVL ? (
		<Outlet />
	) : (
		<Navigate to="login" state={{ from: location }} replace />
	);
};
