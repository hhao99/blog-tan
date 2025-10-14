import { Link } from '@tanstack/react-router';
export default function Footer() {
    return (
        <div className="w-full mx-auto">
            <h3 className="text-gray-600 text-center ">@{(new Date()).getFullYear()} TanStack Start.</h3>
        </div>
    )
}