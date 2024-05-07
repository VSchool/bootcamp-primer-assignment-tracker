import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export const Assignments = withAuthenticationRequired(() => {
    const { user } = useAuth0();
    return (
        <div>
            <h3>Welcome, {user.name}</h3>
        </div>
    )
})