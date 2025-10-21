// src/components/layout/header.tsx
/** Header component for the blog layout */
import { Link } from '@tanstack/react-router';
export default function Header() {
    return (
        <div className="flex bg-gray-200 text-skyblue-800 border-b-1 border-brown-200 justify-between">
            <Link to='/' className="ml-4 font-bold text-xl">
                TansStart Blog
            </Link>
            <nav className="flex bg-gray-300 text-brown-800 space-x-4 mr-4 ">
                <div>
                    <Link to='/posts/new'>New Post</Link>
                </div>
                <div>
                    <Link to='/posts'>Posts</Link>
                </div>
            </nav>
        </div>
    )
}