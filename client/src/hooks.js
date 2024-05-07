import { useContext, useState } from "react";
import { http } from "./http";
import { useAuth0 } from "@auth0/auth0-react";
import { FileContext } from "./contexts";


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

    const request = {
        get: (url, options) => handler(url, { ...options, method: 'GET' }),
        post: (url, options) => handler(url, { ...options, method: 'POST' }),
        delete: (url, options) => handler(url, { ...options, method: 'DELETE' }),
        put: (url, options) => handler(url, { ...options, method: 'PUT' }),
    }

    return {
        request
    }
}

export const useLoadingApi = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    return [
        loading,
        setLoading,
        error,
        setError
    ]
}
