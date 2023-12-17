import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import Todo from "@/pages/Todos";
import TodoDetails from "@/pages/Todos/TodoDetails";

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
	{
		path: "/app/detail/:id",
		element: <TodoDetails />,
	},
]);

export default router;
