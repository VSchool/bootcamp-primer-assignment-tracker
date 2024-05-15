import { Link } from "react-router-dom"
import { useProfileContext } from "../hooks";
import { useAuth0 } from "@auth0/auth0-react";

export const Home = () => {
    const { isAuthenticated, loginWithRedirect, user } = useProfileContext()
    const handleLogin = (e) => {
        e.preventDefault();
        loginWithRedirect({
            authorizationParams: {
                redirect_uri: location.origin + '/assignments'
            }
        })
    }

    return (
        <div className="text-block">
            <h1>V School Bootcamp Primer</h1>
            {isAuthenticated && user && <p>Hi, <b>{user.profile.fullName}</b></p>}
            <p>Welcome to your first foray into web development. This app is designed to help keep you on track as you complete exercises.</p>
            {!isAuthenticated && <p>Please <a href="/" onClick={handleLogin}>login</a> or <a href="/" onClick={handleLogin}>create an account</a> to continue.</p>}
            <p>Before you begin, make sure to download <a href="https://www.loom.com" target="_blank">Loom</a>. You will use this tool to screen record and submit your solutions.</p>
            <p>Visit the <Link to="/assignments">assignments</Link> page to submit assignments and view your progress.</p>
            <p>To submit an assignment, create a short screen recording of your solution. Copy and paste the link in the submission form below the corresponding assignment. You can view and redo your submissions by clicking 'Review Past Submissions'</p>
            <p>Visit the <a href="https://scrimba.com/learn/bootcampprimer" target="_blank">course website</a> to start your first lesson.</p>
            <p>Feel free to reach out to an instructor or fellow student for help on <a href="https://v-school.slack.com/archives/GTLT5AF4N" target="_blank">Slack</a> for assistance.</p>
        </div>
    )
}