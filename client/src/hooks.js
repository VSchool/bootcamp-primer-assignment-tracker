import { useContext, useState } from "react";
import { http } from "./http";
import { useAuth0 } from "@auth0/auth0-react";
import { AssignmentsContext, ProfileContext } from "./contexts";


export const useHttpAuthClient = (tokenOpts) => {
    const { getAccessTokenSilently } = useAuth0();

    const handler = async (url, options) => {
        const accessToken = await getAccessTokenSilently(tokenOpts);
        return http.request(accessToken)(url, options)
    };

    return {
        get: (url, options) => handler(url, { ...options, method: 'GET' }),
        post: (url, options) => handler(url, {
            ...options,
            body: JSON.stringify(options.body),
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            method: 'POST'
        }),
        delete: (url, options) => handler(url, { ...options, method: 'DELETE' }),
        put: (url, options) => handler(url, {
            ...options,
            body: JSON.stringify(options.body),
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            method: 'PUT',
        }),
    }
}

export const useLoadingApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return {
        loading,
        setLoading,
        error,
        setError
    }
}

export const useRequestHandlerFactory = fn => () => {
    const { loading, error, setLoading, setError } = useLoadingApi();

    const handler = async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const output = await fn(...args);
            setLoading(false);
            return output
        } catch (err) {
            console.error(err)
            setLoading(false);
            setError(err);
        }
    }

    return {
        handler,
        error,
        loading
    }
}

export const useProfileApi = () => {
    const baseUrl = `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2`;
    const authApi = useAuth0();
    const [profile, setProfile] = useState(null);
    const authClient = useHttpAuthClient();
    const getUserProfileFactory = useRequestHandlerFactory(async () => {
        const { user_metadata } = await authClient.get(`${baseUrl}/users/${authApi.user.sub}`);
        setProfile(user_metadata);
    });

    return {
        ...authApi,
        user: {
            ...authApi.user,
            profile: {
                ...profile,
                fullName: profile ? `${profile.first_name} ${profile.last_name}` : ''
            }
        },
        getUserProfileFactory
    }

}

export const useAssignmentsApi = () => {
    const [assignments, setAssignments] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const authClient = useHttpAuthClient();

    const getAssignments = useRequestHandlerFactory(async () => {
        const { results: assignmentsData, success: assignmentsSuccess } = await authClient.get('/api/assignments');
        const { results: submissionsData, success: submissionsSuccess } = await authClient.get('/api/submissions');
        if (!assignmentsSuccess || !submissionsSuccess) throw Error('Failed to get assignments or submissions')
        setAssignments(assignmentsData);
        setSubmissions(submissionsData);
    })()

    const createSubmissionFactory = useRequestHandlerFactory(async (submission) => {
        const { results: submissionData, success } = await authClient.post('/api/submissions', {
            body: { submission }
        })
        if (!success) throw Error('Failed to create submission')
        setSubmissions([...submissions, submissionData])
    })

    const deleteSubmissionFactory = useRequestHandlerFactory(async (id) => {
        const { success } = await authClient.delete(`/api/submissions/${id}`)
        if (!success) throw Error('Failed to delete submission')
        setSubmissions(prev => prev.filter(submission => submission._id !== id))
    })

    const assignmentsWithSubmissions = assignments.map(assignment => {
        const submission = submissions.find(submission => submission.assignment === assignment.identifier);
        const isLocked = !!assignment.prerequisite && !submissions.find(sub => sub.assignment === assignment.prerequisite)
        const submitted = !!submission
        return {
            ...assignment,
            submission,
            isLocked,
            submitted
        }
    })

    const progress = {
        percentage: assignments.length ? (submissions.length / assignments.length) * 100 : 0,
        completed: submissions.length,
        total: assignments.length
    }

    const completed = progress.completed === progress.total && submissions.every(sub => sub.approved)
    const pendingApproval = progress.completed === progress.total && submissions.some(sub => !sub.approved)

    const accordion = useAccordion()

    return {
        assignmentsWithSubmissions,
        getAssignments,
        createSubmissionFactory,
        deleteSubmissionFactory,
        progress,
        completed,
        pendingApproval,
        accordion
    }
}

export const useAssignmentsContext = () => useContext(AssignmentsContext)
export const useProfileContext = () => useContext(ProfileContext)

export const useAccordion = () => {
    const [accordion, setAccordion] = useState({})
    const isExpanded = (identifier) => !!accordion[identifier]
    const toggleIsExpanded = (identifier) => setAccordion(prev => ({ ...prev, [identifier]: !prev[identifier] }))
    const reset = () => setAccordion({})

    return {
        toggleIsExpanded,
        isExpanded,
        reset
    }
}

