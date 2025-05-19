import { QueryClient, useMutation } from "@tanstack/react-query";
import { deleteLike, postLike } from "../../apis/lp";
import { Likes, Lp, RequestLpDto, ResponseLpDto } from "../../types/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { ResponseMyinfoDto } from "../../types/auth";
import { CommonResponse } from "../../types/common";


function usePostLike(){
    return useMutation({
        mutationFn:postLike,

        onMutate: async(lp) => {
            await queryClient.cancelQueries({
                queryKey:[QUERY_KEY.lps, lp.lpId],
            });

            const previousLpPost = queryClient.getQueryData<ResponseLpDto>([QUERY_KEY.lps, String(lp.lpId),]);
            if (!previousLpPost) return;

            const newLpPost = {
                ...previousLpPost,
                data: {
                    ...previousLpPost?.data,
                    likes: [...previousLpPost.data.likes],
                },
            };


            const me = queryClient.getQueryData<ResponseMyinfoDto>([QUERY_KEY.myInfo]);
            const userId = Number(me?.data.id);

            const likedIndex = previousLpPost?.data.likes.findIndex(
                (like:Likes) => like.userId === userId,
            )??-1;

            if (likedIndex >= 0){
                previousLpPost?.data.likes.splice(likedIndex, 1);
            } else {
                const newLike:Likes = {userId, lpId:lp.lpId} as Likes;
                previousLpPost?.data.likes.push(newLike);
            }

            console.log(newLpPost)

            queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

            return {previousLpPost, newLpPost};
        },

        onError:(err, newLP, context) => {
            console.log(err, newLP);
            queryClient.setQueryData(
                [QUERY_KEY.lps, newLP.lpId],
                context?.previousLpPost?.data.id,
            );
        },

        onSettled: async (data, error, variables, context) => {
            await queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.lps, variables.lpId],
            });
        },
    });
};

export default usePostLike;