import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom";



export const Navbar = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

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
            {isAuthenticated && <img src={user.picture} alt="avatar" width={32} height={32} />}
        </nav>
    )
}