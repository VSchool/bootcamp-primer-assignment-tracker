import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useAssignmentsContext } from "../hooks";
import { useEffect } from "react";

export const Root = () => {
    const { getAssignments } = useAssignmentsContext();

    useEffect(() => {
        getAssignments.handler();
    }, []);

    return (
        <div>
            <Navbar />
            <section>
                <Outlet />
            </section>
        </div>
    )
}