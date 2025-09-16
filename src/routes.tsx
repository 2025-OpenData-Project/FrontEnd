import { createBrowserRouter } from "react-router";
import { Outlet, Navigate } from "react-router-dom";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Layout from "./layout/Layout.tsx";
import Spot from "./pages/Spot.tsx";
import MyPage from "./pages/MyPage.tsx";
import TourSpots from "./pages/TourSpots.tsx";
import CourseDetail from "./pages/CourseDetail.tsx";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true, // 기본 경로 '/'에서 home으로 자동 리다이렉트
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "spot/:id",
        element: <Spot />,
      },
      {
        path: "my-page",
        element: <MyPage />,
      },
      {
        path: "tourspots",
        element: <TourSpots />,
      },
      {
        path: "courseDetail",
        element: <CourseDetail />,
      },
      {
        path: "courseDetail/:courseId",
        element: <CourseDetail />,
      },
    ],
  },
]);

export default routes;
