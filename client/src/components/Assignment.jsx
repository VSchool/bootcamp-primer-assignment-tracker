import { useAssignmentsContext } from "../hooks"
import { SubmissionForm } from "./SubmissionForm"
import { Accordion } from "./Accordion";
import { Icon } from "./Icon";

export const Assignment = ({ assignment }) => {

    const { createSubmissionFactory, deleteSubmissionFactory, accordion } = useAssignmentsContext()
    const handleDelete = deleteSubmissionFactory();
    const createSubmission = createSubmissionFactory();
    const onSubmit = (submission) => {
        createSubmission.handler(submission)
            .then(toggleIsExpanded)
    }
    const toggleIsExpanded = () => accordion.toggleIsExpanded(assignment.identifier);
    const handleSubmissionStatusClick = () => {
        window.open(assignment.submission.link, '_blank');
    }
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
                        {() => (
                            <div className="submission-details">
                                <span onClick={handleSubmissionStatusClick} className={`submission-status ${assignment.submission.approved ? '--approved' : '--pending'}`}><Icon name="link" />{assignment.submission.approved ? "Approved!" : "Pending Review"}</span>
                                <button onClick={() => handleDelete.handler(assignment.submission._id)} disabled={handleDelete.loading || assignment.submission.approved}>{handleDelete.loading ? "Removing..." : 'Redo'}</button>
                            </div>
                        )}
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
                        {() => (
                            <div className="assignment-details">
                                <SubmissionForm
                                    assignment={assignment}
                                    onSubmit={onSubmit}
                                    submitting={createSubmission.loading}
                                    error={createSubmission.error}
                                />
                                <iframe src={assignment.url} width={"100%"} height={"500px"}></iframe>
                            </div>
                        )}
                    </Accordion>
                )
            })()}
        </li>
    )
}