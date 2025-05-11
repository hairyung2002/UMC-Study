import { useParams } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLpList";
import { useState } from "react";
import { number } from "zod";
import { useAuth } from "../context/AuthContext";

const LpDetailPage = () => {
    const { Lpid } = useParams<{ Lpid: string }>();
    const { data, isPending, isError } = useGetLpList({});

    if (isPending) {
        <div>Loding...</div>
    };

    if (isError) {
        <div>Error!</div>
    }

    const LpDetail = data?.data.data?.find((lp) => String(lp.id) === Lpid);
    console.log(LpDetail);

    return (
        <div className="flex justify-center px-4 py-10">
            <div className="bg-zinc-900 rounded-xl w-full max-w-3xl px-6 py-8 text-white shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <div className="text-sm text-zinc-400">{LpDetail?.Id}</div>
                        <div className="text-2xl font-semibold">{LpDetail?.title}</div>
                        <div className="text-xs text-zinc-500 mt-1">{LpDetail?.createdAt}</div>
                    </div>
                    <div className="flex gap-3 text-zinc-400 text-lg">
                        <button className="hover:text-white"><i className="ri-pencil-line"></i></button>
                        <button className="hover:text-red-500"><i className="ri-delete-bin-line"></i></button>
                    </div>
                </div>

                <div className="flex justify-center my-6">
                    <img
                        src={LpDetail?.thumbnail}
                        alt={LpDetail?.title}
                        className="w-64 h-64 object-cover rounded-xl shadow-md"
                    />
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed mb-6">{LpDetail?.content}</p>

                <div className="flex flex-1 flex-col items-center justify-center">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {LpDetail?.tags.map((tag, idx) => (
                            <span key={idx} className="bg-zinc-700 px-3 py-1 rounded-full text-xs">
                                {tag.name}
                            </span>
                        ))}
                    </div> 

                    <div className="flex items-center text-pink-500 text-sm">
                        <i className="ri-heart-fill mr-1"></i>
                        ❤️{LpDetail?.likes.length}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default LpDetailPage;
