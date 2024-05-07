import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useAssignmentsContext } from "../hooks";
import { useEffect } from "react";

export const Assignments = withAuthenticationRequired(() => {
    const { user } = useAuth0();
    const { assignments, getAssignments } = useAssignmentsContext();

    useEffect(() => {
        getAssignments();
    }, []);

    return (
        <div>
            <h3>Welcome, {user.name}</h3>
            <div>
                {getAssignments.loading && <p>Loading...</p>}
                {getAssignments.error && <p>There was a problem loading assignment data, please try again</p>}
                <ul>
                    {assignments.map((assignment) => <li key={assignment._id}>{assignment.name}</li>)}
                </ul>
            </div>
        </div>
    )
})