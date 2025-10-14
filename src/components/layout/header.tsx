import { Link } from '@tanstack/react-router';
export default function Header() {
    return (
        <div className="flex bg-gray-200 text-skyblue-800 border-b-1 border-brown-200 justify-between">
            <h1>TansStart Blog</h1>
            <nav className="flex bg-gray-300 text-brown-800 space-x-4 mr-4 ">
                <div>
                    <Link to='/'>Home</Link>
                </div>
                <div>
                    <Link to='/Posts'>Posts</Link>
                </div>
            </nav>
        </div>
    )
}