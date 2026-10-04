import AuthLayout from "../../../layouts/AuthLayout"
import RegisterForm from "../components/RegisterForm"


const RegisterPage = () => {
    return (
        <AuthLayout>
            <h1 className="text-sm text-center">
                <RegisterForm/>
            </h1>
        </AuthLayout>
    )
}

export default RegisterPage
