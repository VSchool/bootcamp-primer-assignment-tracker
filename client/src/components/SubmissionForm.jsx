import { useState } from "react";

export const SubmissionForm = ({ assignment, onSubmit, submitting, error }) => {

    const [link, setLink] = useState(assignment.submission ? assignment.submission.link : '');
    const handleChange = (e) => {
        setLink(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ link, assignment: assignment.identifier })
    }

    return (
        <form onSubmit={handleSubmit} className="submission-form">
            <label htmlFor={'loom-link-' + assignment._id} className="submission-form-label">
                To submit your solution, create a short <a href="https://www.loom.com">Loom</a> recording and paste the link here:
            </label>
            <div className="submission-form-body">
                <input id={'loom-link-' + assignment._id} type="url" value={link} onChange={handleChange} placeholder="e.g. https://www.loom.com/share/<id>" required />
                <button type='submit' disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
            </div>
            {error && <p className="typography typography-error typography-sm">There was a problem submitting your assignment, please try again</p>}
        </form>
    )
}