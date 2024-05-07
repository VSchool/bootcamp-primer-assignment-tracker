import { AssignmentsContext } from "../contexts"
import { useAssignmentsApi } from "../hooks"


export const AssignmentsProvider = ({ children }) => {
    const assignmentsApi = useAssignmentsApi();
    return (
        <AssignmentsContext.Provider value={assignmentsApi}>
            {children}
        </AssignmentsContext.Provider>
    )
}