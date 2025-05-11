import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLpList";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    const { search, isSearch } = useState("Live at Fingerprints");
    const { data, isPending, isError } = useGetLpList({
        search,
    });

    if (isPending) {
        return <div className="mt-20">Loading</div>;
    }

    if (isError) {
        return <div className="mt-20">Error</div>
    }

    console.log(data);

    return (
        <div className="p-4">
            <div className="grid grid-cols-5 gap-4">
                {data?.data.data?.map((lp) => (
                    <div
                        key={lp.id}
                        className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform transform hover:scale-105"
                        onClick={() => accessToken?navigate(`/detail/${lp.id}`):
                        (alert("로그인이 필요한 서비스입니다. 로그인 후 이용해주세요!"),
                        navigate(`/detail/${lp.id}`))}
                    >
                        <img
                            src={"/public/images/LP_Image.jpg"}
                            alt={lp.title}
                            className="w-full h-40 object-cover rounded-lg shadow-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 text-white">
                            <div className="text-sm font-semibold truncate">{lp.title}</div>
                            <div className="text-xs">{lp.createdAt}</div>
                            <div className="text-xs mt-1">❤️ {lp.likes}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;