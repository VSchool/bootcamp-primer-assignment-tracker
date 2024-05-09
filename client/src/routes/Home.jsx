import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div>
            <h1>V School Bootcamp Primer</h1>
            <p>Welcome to your first foray into web development! This app is designed to help keep you on track as you complete exercises.</p>
            <p>Before you begin, make sure to download <a href="https://www.loom.com">Loom</a>. You will use this tool to screen record and submit your solutions.</p>
            <p>Visit the <Link to="/assignments">assignments</Link> page to submit assignments and view your progress.</p>
            <p>To submit an assignment, create a short screen recording of your solution. Copy and paste the link in the submission form below the corresponding assignment. You can view and redo your submissions by clicking 'Review</p>
            <p>Visit the <a href="https://scrimba.com/learn/bootcampprimer">course website</a> to start your first lesson.</p>
        </div>
    )
}