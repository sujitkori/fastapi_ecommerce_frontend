import { getApiErrorMessage } from '../../../utils/apiError';
import useProfile from '../hooks/useProfile';

const ProfilePage = () => {

    const {data, isPending, isError, error} = useProfile();

    if (isPending) {
        return <h2>Loading...</h2>;
    }

    {
        isError && (
          <p className="text-sm text-red-600">
            {getApiErrorMessage(error, "Failed to load profile")}
          </p>
        );
      }

  return (
    <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>

            <p><strong>ID:</strong> {data?.id}</p>
            <p><strong>Name:</strong> {data?.name}</p>
            <p><strong>Email:</strong> {data?.email}</p>
        </div>
  )
}

export default ProfilePage
