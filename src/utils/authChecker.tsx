import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function PrivateRoute({ children }) {
	const navigate = useNavigate();

	const token = localStorage.getItem("token");

	useEffect(() => {
		if (!token) navigate("/auth#login", { replace: true });
	}, [navigate, token]);

	return <>{children}</>;
}

export function IsLogin({ children }) {
	const navigate = useNavigate();

	const token = localStorage.getItem("token");

	useEffect(() => {
		if (token) navigate("/app", { replace: true });
	}, [navigate, token]);

	return <>{children}</>;
}
