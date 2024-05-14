import { ProfileContext } from "../contexts"
import { useProfileApi } from "../hooks"

export const ProfileProvider = ({ children }) => {

    const profileApi = useProfileApi();

    return (
        <ProfileContext.Provider value={profileApi}>
            {children}
        </ProfileContext.Provider>
    )
}