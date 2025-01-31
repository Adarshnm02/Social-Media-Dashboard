import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/store"
import { fetchUser, updateUser } from "../features/users/usersSlice";

const Profile = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    const [username, setUsername] = useState('');

    useEffect(() => {
        dispatch(fetchUser('1')) // Replace with dynamic userID
    }, [dispatch])

    useEffect(() => {
        if (user?.username) setUsername(user.username)
        else setUsername("");
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user) await dispatch(updateUser({ id: user.id, username }))
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Update Profile
                </button>
            </form>
        </div>
    )
}

export default Profile
