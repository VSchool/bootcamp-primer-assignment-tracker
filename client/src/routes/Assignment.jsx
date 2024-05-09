import { useAssignmentsContext } from "../hooks"
import { SubmissionForm } from "./SubmissionForm"

export const Assignment = ({ assignment }) => {

    const { createSubmissionFactory, deleteSubmissionFactory, accordion } = useAssignmentsContext()
    const handleDelete = deleteSubmissionFactory();
    const createSubmission = createSubmissionFactory();
    const onSubmit = (submission) => {
        createSubmission.handler(submission)
            .then(toggleIsExpanded)
    }
    const toggleIsExpanded = () => accordion.toggleIsExpanded(assignment.identifier);
    const isExpanded = accordion.isExpanded(assignment.identifier);

    return (
        <li>
            {(() => {
                if (assignment.submitted) return (
                    <p>{assignment.name} <span>[Submitted]</span> <button onClick={() => handleDelete.handler(assignment.submission._id)} disabled={handleDelete.loading}>Redo</button></p>
                )
                if (assignment.isLocked) return <p>{assignment.name} <button disabled>Locked</button></p>
                return (
                    <div>
                        <p>{assignment.name} [Unlocked] <button onClick={toggleIsExpanded}>{isExpanded ? 'Hide' : 'View Assignment'}</button></p>
                        {isExpanded && (
                            <div>
                                <iframe src={assignment.url} width={"100%"} height={"500px"}></iframe>
                                <SubmissionForm
                                    assignment={assignment}
                                    onSubmit={onSubmit}
                                    submitting={createSubmission.loading}
                                    error={createSubmission.error}
                                />
                            </div>
                        )}
                    </div>
                )
            })()}
        </li>
    )
}