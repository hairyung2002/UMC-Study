import { data, useParams } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLpList";
import { useState } from "react";
import { number } from "zod";
import { useAuth } from "../context/AuthContext";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { Likes } from "../types/lp";
import { Heart } from "lucide-react"
import { deleteLike, postLike } from "../apis/lp";
import usePostLike from "../hooks/mutation/usePostLike";
import useDeleteLike from "../hooks/mutation/useDeleteLike";

const LpDetailPage = () => {
    const { lpId } = useParams();
    const { accessToken } = useAuth();
    const { data:lp, isPending, isError } = useGetLpDetail(lpId);    
    const { data: me } = useGetMyInfo(accessToken);

    const { mutate:likeMutate } = usePostLike();
    const { mutate:dislikeMutate } = useDeleteLike();
    
    const isLiked = lp?.data.likes.some((like:Likes) => like.userId === me?.data.id as number);

    const handleLikeLp = () => {
        likeMutate({lpId:Number(lpId)});
    };

    const handleDislikeLp = () => {
        dislikeMutate({lpId:Number(lpId)});
    };

    if(isPending && isError){
        return <></>
    }

    return (
        <div className="flex justify-center px-4 py-10">
            <div className="bg-zinc-900 rounded-xl w-full max-w-3xl px-6 py-8 text-white shadow-xl">
                <div className="flex justify-between items-center mb-4">

                    <div></div>
                    <div>
                        <div className="text-sm text-zinc-400">{lp?.data.id}</div>
                        <div className="text-2xl font-semibold">{lp?.data.title}</div>
                        <div className="text-xs text-zinc-500 mt-1">{lp?.data.createdAt}</div>
                    </div>
                    <div className="flex gap-3 text-zinc-400 text-lg">
                        <button className="hover:text-white"><i className="ri-pencil-line"></i></button>
                        <button className="hover:text-red-500"><i className="ri-delete-bin-line"></i></button>
                    </div>
                </div>

                <div className="flex justify-center my-6">
                    <img
                        src={lp?.data.thumbnail}
                        alt={lp?.data.title}
                        className="w-64 h-64 object-cover rounded-xl shadow-md"
                    />
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed mb-6">{lp?.data.content}</p>

                <div className="flex flex-1 flex-col items-center justify-center">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {lp?.data.tags.map((tag, idx) => (
                            <span key={idx} className="bg-zinc-700 px-3 py-1 rounded-full text-xs">
                                {tag.name}
                            </span>
                        ))}
                    </div>

                    <button className="flex items-center text-pink-500 text-sm" onClick={isLiked?handleDislikeLp:handleLikeLp}>
                        <Heart color={isLiked?"red":"black"} fill={isLiked?"red":"transparent"}/>
                    </button>
                    <span className="text-sm text-zinc-400 ml-2">
                        {lp?.data.likes.length}명이 좋아합니다.</span>
                    <button className="absolute top-2 right-2 text-white text-xs rounded px-2 py-1 shadow hover:bg-gray-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        openCommentModal(lp?.data.id as number);
                    }}>댓글...</button>
                </div>

            </div>

        </div>
    );
};

export default LpDetailPage;
