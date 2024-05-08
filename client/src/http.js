export const http = {
    request: (accessToken) => {
        return (url, options) => fetch(url, {
            ...options,
            headers: {
                authorization: `Bearer ${accessToken}`,
                ...options.headers
            }
        }).then(res => res.json())
    }
}