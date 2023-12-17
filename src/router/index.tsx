import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import Todo from "@/pages/Todos";
import TodoDetails from "@/pages/Todos/TodoDetails";
import { IsLogin, PrivateRoute } from "@/utils/authChecker";
import NotFound from "@/pages/Error";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<IsLogin>
				<Home />
			</IsLogin>
		),
	},
	{
		path: "/auth",
		element: (
			<IsLogin>
				<Auth />
			</IsLogin>
		),
	},
	{
		path: "/app",
		element: (
			<PrivateRoute>
				<Todo />
			</PrivateRoute>
		),
	},
	{
		path: "/app/detail/:id",
		element: (
			<PrivateRoute>
				<TodoDetails />
			</PrivateRoute>
		),
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

export default router;
