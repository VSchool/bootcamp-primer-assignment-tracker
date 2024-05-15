const axios = require('axios');

const auth0MgtmClient = axios.create({ baseURL: process.env.AUTH0_ISSUER_BASE_URL });


const getAccessToken = () => auth0MgtmClient.request({
    method: 'POST',
    url: '/oauth/token',
    data: {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: 'client_credentials'
    }
}).then(res => res.data.access_token)


const getUserProfile = async (id) => {
    const accessToken = await getAccessToken()
    const { data: { user_metadata: { first_name, last_name }, email, user_id } } = await auth0MgtmClient.request({
        method: 'GET',
        url: `/api/v2/users/${id}`,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return {
        email,
        user_id,
        first_name,
        last_name
    }
}

module.exports = {
    getUserProfile
}