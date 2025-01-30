import {RouteObject, useRoutes} from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { PaintingsPage } from "./pages/PaintingsPage";
import PaintingDetailsPage from "./pages/PaintingDetailPage";
import { LoginPage } from "./pages/LoginPage";
import { UserAccountPage } from "./pages/UserAccountPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ExpertisePage } from "./pages/ExpertisePage";
import { ExpertiseListPage } from "./pages/ExpertiseListPage";


export const AppRoutes = () => {
    const routes: RouteObject[] = [
        {
            path: "",
            element: <MainPage />,
        },
        {
            path: "paintings",
            element: <PaintingsPage />,
        },
        {
            path: "paintings/:pk",
            element: <PaintingDetailsPage />,
        },
        {
            path: "login",
            element: <LoginPage />,
        },
        {
            path: "user-account",
            element: <UserAccountPage />,
        },
        {
            path: "register",
            element: <RegisterPage />,
        },
        {
            path: "expertise/:expertiseId",
            element: <ExpertisePage />,
        },
        {
            path: "expertises-list",
            element: <ExpertiseListPage />,
        },
    ];
    const routeResult = useRoutes(routes);
    return <>{routeResult}</>;
};