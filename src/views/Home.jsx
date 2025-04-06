import {Link} from "react-router-dom";


export default function Home() {
    return (
        <div class="container justify-content-center align-content-center mt-5">
            <div class="jumbotron">
                <h1 class="text-center mb-4">Welcome to Dataviz of StackOversize</h1>

                <div class="text-center">
                    <p>Please log in with your stackoversize ids</p>
                <Link to="/login" class="btn btn-primary">Login</Link>
            </div>
        </div>
</div>
)
}