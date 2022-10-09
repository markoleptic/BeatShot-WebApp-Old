import useLogout from "../hooks/useLogout";

const Profile = () => {
    const Logout = useLogout();
    const signOut = async () => {
    await Logout();
    }
    return (
        <>
        <h2>Only visible to those who have logged in</h2>
        <button onClick={signOut}>Sign Out</button>
        </>
    )
}
export default Profile;