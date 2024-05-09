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
            <footer>
                <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Icons by Dave Gandy - Flaticon</a>
            </footer>
        </div>
    )
}