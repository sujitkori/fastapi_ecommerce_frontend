import AuthLayout from "../../../layouts/AuthLayout"
import LoginForm from "../components/LoginForm"


const LoginPage = () => {
    return (
        <AuthLayout>
            <h1 className="text-sm text-center">
                <LoginForm/>
            </h1>
        </AuthLayout>
    )
}

export default LoginPage
