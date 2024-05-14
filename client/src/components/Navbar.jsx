import { Link } from "react-router-dom";
import { useProfileContext } from "../hooks";



export const Navbar = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useProfileContext();

    const handleLogin = () => loginWithRedirect({
        authorizationParams: {
            redirect_uri: location.origin + '/assignments'
        }
    })

    const handleLogout = () => {
        logout();
    }

    return (
        <nav className="navbar">
            <div className="nav-links">
                {(() => {
                    if (isAuthenticated) return (
                        <>
                            <Link to='/'>Home</Link>
                            <Link to='/assignments'>Assignments</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    )
                    return (
                        <>
                            <Link to='/'>Home</Link>
                            <button onClick={handleLogin}>Login</button>
                        </>
                    )
                })()}
            </div>
            <div className="user">
                {user && user.profile && <p>{user.profile.fullName}</p>}
                {isAuthenticated && <img src={user.picture} alt="avatar" width={32} height={32} />}
            </div>
        </nav>
    )
}