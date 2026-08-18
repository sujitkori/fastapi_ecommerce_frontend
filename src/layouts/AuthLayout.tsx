import { type ReactNode } from 'react'

interface AuthLayoutProps {
    children:ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout
