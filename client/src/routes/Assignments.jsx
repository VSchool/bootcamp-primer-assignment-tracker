import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useAssignmentsContext } from "../hooks";
import { Assignment } from "../components/Assignment";
import { useState } from "react";

export const Assignments = withAuthenticationRequired(() => {
    const { assignmentsWithSubmissions, getAssignments, progress, completed } = useAssignmentsContext();
    const [showSubmitted, setShowSubmitted] = useState(false);

    return (
        <div>
            <h1>Assignments Overview</h1>
            <div>
                <p>{progress.completed} out of {progress.total} completed ({progress.percentage.toFixed(0)}%)</p>
                <button onClick={() => setShowSubmitted(prev => !prev)}>{showSubmitted ? "Back to Assignments" : "Review Past Submissions"}</button>
            </div>
            <div>
                {(() => {
                    if (getAssignments.loading) return <p>Loading...</p>
                    if (getAssignments.error) return <p>There was a problem loading assignment data, please try again</p>
                    if (showSubmitted) return (
                        <ul>
                            {assignmentsWithSubmissions
                                .filter(assignment => !!assignment.submitted)
                                .map((assignment) => (
                                    <Assignment
                                        key={assignment._id}
                                        assignment={assignment}
                                    />
                                ))}
                        </ul>
                    )
                    if (completed) return <p>Congratulations! You have completed the course. Please visit <a href="https://vschool.io">V School</a> to view more educational opportunities in tech.</p>
                    return (
                        <ul>
                            {assignmentsWithSubmissions
                                .filter(assignment => !assignment.submitted)
                                .map((assignment) => (
                                    <Assignment
                                        key={assignment._id}
                                        assignment={assignment}
                                    />
                                ))}
                        </ul>
                    )
                })()}
            </div>
        </div>
    )
})