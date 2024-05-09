import { Icon } from "./Icon";
import { useAssignmentsContext } from "../hooks"
import { SubmissionForm } from "../routes/SubmissionForm"
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
                    <p>{assignment.name} <span>[Submitted][{assignment.approved ? 'Approved' : 'Pending Approval'}]</span> <button onClick={() => handleDelete.handler(assignment.submission._id)} disabled={handleDelete.loading}>Redo</button></p>
                )
                return (
                    <Accordion
                        open={isExpanded}
                        heading={<p>{assignment.isLocked ? <Icon name="lock" /> : <Icon name="unlock" />} {assignment.name}</p>}
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