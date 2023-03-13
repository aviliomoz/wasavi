import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
    return <div className="w-10/12 mx-auto mt-16">
        <Outlet />
    </div>
}