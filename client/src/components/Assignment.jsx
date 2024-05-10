import { Icon } from "./Icon";
import { useAssignmentsContext } from "../hooks"
import { SubmissionForm } from "./SubmissionForm"
import { Accordion } from "./Accordion";

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
                    <Accordion
                        open={isExpanded}
                        title={assignment.name}
                        icon={assignment.submission.approved ? "success" : "pending"}
                        toggleIsExpanded={toggleIsExpanded}
                    >
                        <div className="submission-details">
                            <span className={`submission-status ${assignment.submission.approved ? '--approved' : '--pending'}`}>{assignment.submission.approved ? "Approved!" : "Pending Review"}</span>
                            <button onClick={() => handleDelete.handler(assignment.submission._id)} disabled={handleDelete.loading || assignment.submission.approved}>{handleDelete.loading ? 'Removing...' : 'Redo'}</button>
                        </div>
                    </Accordion>
                )
                return (
                    <Accordion
                        open={isExpanded}
                        title={assignment.name}
                        icon={assignment.isLocked ? "lock" : "unlock"}
                        toggleIsExpanded={toggleIsExpanded}
                        disabled={assignment.isLocked}
                    >
                        <div>
                            <iframe src={assignment.url} width={"100%"} height={"500px"}></iframe>
                            <SubmissionForm
                                assignment={assignment}
                                onSubmit={onSubmit}
                                submitting={createSubmission.loading}
                                error={createSubmission.error}
                            />
                        </div>
                    </Accordion>
                )
            })()}
        </li>
    )
}