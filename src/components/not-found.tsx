import { useRouter, Link } from '@tanstack/react-router';

/*
    A simple Not Found component that can be used across the app.

    Props:
    - children: The message to display when a page is not found.

    Usage:
    <NotFound>Your custom message here.</NotFound>
*/


export default function NotFound({children}: {children: any}) {
    const router = useRouter();
    return (
        <>
            <div className='space-y-2 p-2'>
                <h1 className='text-3xl font-bold'>404 - Not Found</h1>
                <p>{children || 'The page you are looking for does not exist.'}</p>
                <div className='w-full flex gap-4'>
                <Link to='/' className='bg-cyan-600 text-white px-2 py-1 rounded uppercase font-semibold text-sm'>Go to Home</Link>
                <button 
                className='bg-cyan-600 text-white px-2 py-1 rounded uppercase font-semibold text-sm'
                onClick={()=> window.history.back()}> Go Back</button>
                </div>
            </div>
        </>
    )
}