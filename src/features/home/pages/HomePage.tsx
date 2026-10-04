import { useAuth } from "../../auth/hooks/useAuth";
import useProfile from "../../auth/hooks/useProfile";


const HomePage = () => {

    const { data, isPending, isError } = useProfile();
    const {logout} = useAuth()

    if (isPending) {
        return <h2>Loading...</h2>;
    }

    if (isError) {
        return (
            <div className="text-red-500">
                Something went wrong while loading your profile.
            </div>
        )
    }

    return (
        <>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-6">Profile</h1>

                <p><strong>ID:</strong> {data.id}</p>
                <p><strong>Name:</strong> {data.name}</p>
                <p><strong>Email:</strong> {data.email}</p>
            </div>

            <button
                onClick={logout}
                className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
            >
                Logout
            </button>
        </>
    )
}

export default HomePage
