// src/components/layout/header.tsx
/** Header component for the blog layout */
import { Link } from '@tanstack/react-router';
export default function Header({user}) {
    return (
        <div className="flex  border-b-1 border-brown-200 justify-between">
            <Link to='/' className="ml-4 font-bold text-xl">
                TansStart Blog
            </Link>
            <nav className="flex space-x-4 mr-4 ">
                {user.id ? (
                    <>
                    <div>
                        Welcome, {user.firstname} {user.lastname} |
                        <Link to='/logout' className="ml-2">Logout</Link>
                    </div>

                <div>
                    <Link to='/posts/new'>New Post</Link>
                </div>
                    </>
                    
                ) : (
                    <div>
                        <Link to='/login'>Login</Link> | <Link to='/signup'>Sign Up</Link>
                    </div>
                )}
                <div>
                    <Link to='/posts'>Posts</Link>
                </div>
            </nav>
        </div>
    )
}