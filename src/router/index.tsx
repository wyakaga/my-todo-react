import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import Todo from "@/pages/Todos";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/auth",
		element: <Auth />,
	},
	{
		path: "/app",
		element: <Todo />,
	},
]);

export default router;
