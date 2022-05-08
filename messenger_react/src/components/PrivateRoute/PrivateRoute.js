import { Navigate, Outlet } from "react-router";

export const PrivateRoute = ({ auhted }) => (
    auhted ? <Outlet /> : <Navigate to="/" replace />

)