import {
  createBrowserRouter,
} from "react-router-dom";
import PostList from "../pages/PostList";
import PostDetail from "../pages/PostDetail";
import PostCreate from "../pages/PostCreate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PostList />,
  },
  {
    path: "/detail/:id",
    element: <PostDetail />,
  },
  {
    path: "/insert",
    element: <PostCreate />,
  },
]);

export default router