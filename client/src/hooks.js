import { useContext, useState } from "react";
import { http } from "./http";
import { useAuth0 } from "@auth0/auth0-react";
import { AssignmentsContext } from "./contexts";


/**
 * Automatically attaches Auth0 user access token to outgoing requests
 * @example 
 * const { request } = useHttpAuthClient()
 * request('/api/path/to/authorized/resource')
 *  .then(data => {console.log(data)})
 */
export const useHttpAuthClient = () => {
    const { getAccessTokenSilently } = useAuth0();

    const handler = async (url, options) => {
        const accessToken = await getAccessTokenSilently();
        return http.request(accessToken)(url, options)
    };

    return {
        get: (url, options) => handler(url, { ...options, method: 'GET' }),
        post: (url, options) => handler(url, { ...options, method: 'POST' }),
        delete: (url, options) => handler(url, { ...options, method: 'DELETE' }),
        put: (url, options) => handler(url, { ...options, method: 'PUT' }),
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

export const useRequestHandler = (fn) => {
    const { loading, error, setLoading, setError } = useLoadingApi();

    const handler = async (...args) => {
        setLoading(true);
        setError(null);
        try {
            await fn(...args);
            setLoading(false);
        } catch (err) {
            console.error(err)
            setLoading(false);
            setError(err);
        }
    }

    handler.error = error;
    handler.loading = loading;

    return handler
}

export const useAssignmentsApi = () => {
    const [assignments, setAssignments] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const authClient = useHttpAuthClient();

    const getAssignments = useRequestHandler(async () => {
        const { results } = await authClient.get('/api/assignments');

        // merge submissions with assignments somehow
        await authClient.get('/api/submissions');
        setAssignments(results);
    })


    return {
        assignments,
        submissions,
        getAssignments,
    }
}

export const useAssignmentsContext = () => useContext(AssignmentsContext)

