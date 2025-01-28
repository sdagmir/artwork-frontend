import {RouteObject, useRoutes} from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { PaintingsPage } from "./pages/PaintingsPage";
import PaintingDetailsPage from "./pages/PaintingDetailPage";


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
    ];
    const routeResult = useRoutes(routes);
    return <>{routeResult}</>;
};