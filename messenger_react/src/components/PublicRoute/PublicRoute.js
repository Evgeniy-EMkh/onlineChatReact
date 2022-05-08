import { Navigate, Outlet } from "react-router";

export const PublicRoute = ({ auhted }) => (
    !auhted ? <Outlet /> : <Navigate to="/profile" replace />

)