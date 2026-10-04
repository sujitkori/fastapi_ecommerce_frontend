import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import type { RegisterFormData } from '../types/auth.types'
import useRegister from '../hooks/useRegister'
import { getApiErrorMessage } from '../../../utils/apiError'

const RegisterForm = () => {

    const [registerData, setRegisterData] = useState<RegisterFormData>({
        name:"",
        email:"",
        password:""
    })

    const {mutate, isPending, isError, error} = useRegister();

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setRegisterData((prev) => {
            return {
                ...prev,
                [name]:value
            }
        })
    }

    const handleSubmit = (event:React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutate(registerData)
    }

    {isError && (
        <p className='text-red-500 text-sm'>
            {getApiErrorMessage(error, "Failed to Register")}
        </p>
    )
    }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <h1 className="text-3xl font-bold text-center">
                    Registration
                </h1>

                <p className="text-gray-500 text-center mt-2">
                    Register your acount
                </p>
            </div>

            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                >
                    Name
                </label>

                <input
                    id="name"
                    name='name'
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    value={registerData.name}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                >
                    Email
                </label>

                <input
                    id="email"
                    name='email'
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    value={registerData.email}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-2"
                >
                    Password
                </label>

                <input
                    id="password"
                    name='password'
                    type="password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    value={registerData.password}
                    onChange={handleChange}
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition-colors"
            >
                {isPending? 'Loading...' :'Register'}
            </button>

            <p className="text-center text-sm text-gray-600">
                already have an account?{' '}
                <Link
                    to="/login"
                    className="text-blue-600 hover:underline"
                >
                    Login
                </Link>
            </p>
        </form>
  )
}

export default RegisterForm
