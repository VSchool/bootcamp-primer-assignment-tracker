import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useAssignmentsContext } from "../hooks";
import { Assignment } from "../components/Assignment";
import { useState } from "react";

export const Assignments = withAuthenticationRequired(() => {
    const { assignmentsWithSubmissions, getAssignments, progress, completed, pendingApproval, accordion } = useAssignmentsContext();
    const [showSubmitted, setShowSubmitted] = useState(false);

    const handleReviewSubmissions = () => {
        setShowSubmitted(prev => !prev)
        accordion.reset()
    }

    return (
        <div>
            <h1>{showSubmitted ? "Submitted Assignments" : "Assignments"}</h1>
            <div>
                <p><b>{progress.completed}</b> out of <b>{progress.total}</b> completed ({progress.percentage.toFixed(0)}%)</p>
                <button onClick={handleReviewSubmissions}>{showSubmitted ? "Back to Assignments" : "Review Past Submissions"}</button>
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
                    if (pendingApproval) return <p>Nice work! All assignments have been submitted. Please be patient while your teacher reviews your submissions.</p>
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