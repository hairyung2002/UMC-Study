import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async() => {
        await logout();
        navigate("/");
    }

    return (
        <div className="flex justify-between items-center w-full bg-gray-950">
            <div>
                <button className="px-4 py-2 bg-gray-950 text-pink-500 rounded cursor-pointer hover: whitespace-break-spaces" 
                onClick={() => {navigate('/')}}>돌려돌려 LP판</button>
            </div>

            <div className="flex gap-2 bg-gray-900">
                {!accessToken ?
                    <>
                        <button className="px-4 py-2 bg-black text-white rounded cursor-pointer hover:bg-gray-800"
                        onClick={() => {navigate('/login')}}>로그인</button>
                        <button className="px-4 py-2 bg-pink-500 text-white rounded cursor-pointer hover:bg-pink-300"
                        onClick={() => {navigate('/signup')}}>회원가입</button>
                    </> :
                    <>
                        <button className="px-4 py-2 bg-black text-white rounded">마이페이지</button>
                        <button className='cursor-pointer bg-blue-300 rounded-sm p-4 hover:scale-90' onClick={handleLogout}>로그아웃</button>
                    </>};


            </div>
        </div>
    );
};